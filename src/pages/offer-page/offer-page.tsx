import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { fetchOfferDetailsAction,
  fetchReviewsAction,
  fetchOfferNearbyAction,
  fetchFavoritesAction
} from '../../store/api-action';
import { useAppSelector, useAppDispatch } from '../../hooks';

import Header from '../../components/header/header';
import Comment from '../../components/comment/comment';
import ReviewList from '../../components/review/reviews-list';
import { OffersListMemo } from '../../components/offers-list/offers-list';
import OfferGallery from '../../components/offer-gallery/offer-gallery';
import Loader from '../../components/loader/loader';
import DetailedOfferPage from '../../components/detailed-offer/detaild-offer';
import Map from '../../components/map/map';

import { getAuthorizationStatus } from '../../store/user-data/selectors';
import { getDetailedOffer } from '../../store/detailed-offer-data/selectors';
import { getReviews } from '../../store/reviews-data/selectors';
import { getOffers } from '../../store/offers-data/selectors';
import { getNearbyOffers } from '../../store/nearby-data/selectors';
import { getFetchingStatusOffer } from '../../store/detailed-offer-data/selectors';
import { AuthorizationStatus, RequestStatus } from '../../const';

function OfferPage(): JSX.Element {
  const {id: offerId} = useParams();

  const isDataLoading = useAppSelector(getFetchingStatusOffer);
  const isAuthorizationStatus = useAppSelector(getAuthorizationStatus);

  const offer = useAppSelector(getDetailedOffer);
  const offers = useAppSelector(getOffers);
  const reviews = useAppSelector(getReviews);
  const offersNearby = useAppSelector(getNearbyOffers);
  const currentOffer = offers.find(({id}) => id === offerId);
  const randomNearbyOffers = offersNearby.slice(0, 3);
  const randomNearbyMap = offersNearby.slice(0, 3);

  const dispatch = useAppDispatch();

  if (currentOffer) {
    randomNearbyMap.push(currentOffer);
  }

  useEffect(() => {
    if(offerId) {
      dispatch(fetchOfferDetailsAction(offerId));
      dispatch(fetchReviewsAction(offerId));
      dispatch(fetchOfferNearbyAction(offerId));
      dispatch(fetchFavoritesAction());
    }
  }, [dispatch, offerId]);

  if (isDataLoading === RequestStatus.Pending) {
    return (
      <Loader />
    );
  }

  return (
    <>
      <Helmet>
        <title>6 cities: offer</title>
      </Helmet>
      <div className="page">
        <Header />
        {isDataLoading === RequestStatus.Success && offer &&
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
        <section className="offer__map map">
          <Map
            city={offer.city}
            points={randomNearbyMap}
            selectedPoint={currentOffer}
            detailedOffer={offer}
          />
        </section>
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <OffersListMemo
            type='near'
            offers={randomNearbyOffers}
          />
        </section>
      </div>
    </main>}
      </div>
    </>
  );
}

export default OfferPage;
