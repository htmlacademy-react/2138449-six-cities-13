import Header from '../../components/header/header';
import Comment from '../../components/comment/comment';
import ReviewList from '../../components/review/reviews-list';
import OffersList from '../../components/offers-list/offers-list';
import OfferGallery from '../../components/offer-gallery/offer-gallery';
import { loadDetails } from '../../store/api-action';
import Map from '../../components/map/map';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { useEffect } from 'react';
import LoadingPage from '../loading-page/loading-page';
import { AuthorizationStatus } from '../../const';
import DetailedOfferPage from '../../components/detailed-offer/detailde-offer';

function OfferPage(): JSX.Element | null {
  const {id: offerId} = useParams();
  const isDataLoading = useAppSelector((state) => state.loadingStatus);
  const isAuthorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const offer = useAppSelector((state) => state.actualOffer);
  const reviews = useAppSelector((state) => state.reviews);
  const offersNearby = useAppSelector((state) => state.offersNearby);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if(offerId) {
      dispatch(loadDetails(offerId));
    }
  }, [dispatch, offerId]);

  if (isDataLoading) {
    return (
      <LoadingPage />
    );
  }

  return (
    <>
      <Helmet>
        <title>6 cities: offer</title>
      </Helmet>
      <div className="page">
        <Header />
        {!isDataLoading && offer &&
    <main className="page__main page__main--offer">
      <section className="offer">
        <OfferGallery offer={offer} />

        <div className="offer__container container">
          <div className="offer__wrapper">
            <DetailedOfferPage offer={offer} />
            <section className="offer__reviews reviews">
              <ReviewList reviews={reviews} />

              {isAuthorizationStatus === AuthorizationStatus.Auth &&
              <Comment offerId={offerId as string} />}
            </section>
          </div>
        </div>
        <section className="offer__map">
          <Map city={offer.city} points={offersNearby} />
        </section>
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <OffersList type='near' offers={offersNearby} />
        </section>
      </div>
    </main>}
      </div>
    </>
  );
}

export default OfferPage;
