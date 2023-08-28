import { useEffect } from 'react';
import { useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import {
  fetchOfferDetailsAction,
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
import { getNearbyOffers } from '../../store/nearby-data/selectors';
import { getFetchingStatusOffer } from '../../store/detailed-offer-data/selectors';
import { AuthorizationStatus, RequestStatus } from '../../const';
import { Offer } from '../../types/offers';

const NEARBY_OFFERS_COUNT = 3;

function OfferPage(): JSX.Element {
  const {id: offerId} = useParams();

  const offer = useAppSelector(getDetailedOffer);
  const reviews = useAppSelector(getReviews);
  const offersNearby = useAppSelector(getNearbyOffers);
  const isDataLoading = useAppSelector(getFetchingStatusOffer);
  const isAuthorizationStatus = useAppSelector(getAuthorizationStatus);

  const dispatch = useAppDispatch();

  const randomNearbyMap = offersNearby.slice(0, NEARBY_OFFERS_COUNT);
  const randomNearbyOffers = randomNearbyMap.slice(0, NEARBY_OFFERS_COUNT);

  const [selectedPoint, setSelectedPoint] = useState<Offer | undefined>(
    undefined
  );

  const handleOfferCardHover = useCallback((id: string | undefined) => {
    if (!id) {
      setSelectedPoint(undefined);
    }

    const currentOffer = offersNearby.find((offerNearby) => offerNearby.id === id);

    setSelectedPoint(currentOffer);
  }, [offersNearby]);

  useEffect(() => {
    if(offerId) {
      dispatch(fetchOfferDetailsAction(offerId));
      dispatch(fetchReviewsAction(offerId));
      dispatch(fetchOfferNearbyAction(offerId));
      dispatch(fetchFavoritesAction());
    }
  }, [dispatch, offerId]);

  if (offer) {
    randomNearbyMap.push(offer);
  }

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
            selectedPoint={selectedPoint}
            detailedOffer={offer}
          />
        </section>
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <OffersListMemo
            type='near-places'
            offers={randomNearbyOffers}
            onListItemHover={handleOfferCardHover}
          />
        </section>
      </div>
    </main>}
      </div>
    </>
  );
}

export default OfferPage;
