import { store } from '../store';
import { AuthorizationStatus, RequestStatus } from '../const';
import { AuthorizedUser } from './user-data';
import { Offer, DetailedOffer, City } from './offers';
import { Review } from './review';

type Reviews = Review[];
type Offers = Offer[];

export type UserData = {
  user: AuthorizedUser | null;
  authorizationStatus: AuthorizationStatus;
  sendingStatusLogin: RequestStatus;
}

export type OffersData = {
  offers: Offers;
  fetchingStatusOffers: RequestStatus;
  activeCity: City;
}

export type DetailedOfferData = {
  offer: DetailedOffer | null;
  fetchingStatusOffer: RequestStatus;
}


export type ReviewsData = {
  reviews: Reviews;
  fetchingStatusReviews: RequestStatus;
  sendingStatusReview: RequestStatus;
}

export type NearbyData = {
  nearby: Offers;
  fetchingStatusNearby: RequestStatus;
}

export type FavoritesData = {
  favorites: Offers;
  fetchingStatusFavorites: RequestStatus;
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
