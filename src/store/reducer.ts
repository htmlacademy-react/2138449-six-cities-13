import {
  changeCity,
  sortOffersCity,
  filterOffer,
  loadOffers,
  offersLoadingStatus,
  requireAuthorization,
  loadOffersDetails,
  loadNearPlaces,
  loadReviews
} from './action';
import { createReducer } from '@reduxjs/toolkit';
import { Offer, City, DetailedOffer } from '../types/offers';
import { Review } from '../types/review';
import { CityMap, AuthorizationStatus } from '../const';

type Offers = Offer[];
type Reviews = Review[];

type InitialState = {
  city: City;
  offers: Offer[];
  sortOffers: Offer[];
  filterOffers: Offer[];
  loadingStatus: boolean;
  authorizationStatus: AuthorizationStatus;
  actualOffer: DetailedOffer | null;
  reviews: Reviews;
  offersNearby: Offers;
}

const initialState: InitialState = {
  city: CityMap.Paris,
  offers: [],
  sortOffers: [],
  filterOffers: [],
  loadingStatus: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  actualOffer: null,
  reviews: [],
  offersNearby: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(offersLoadingStatus, (state, action) => {
      state.loadingStatus = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(loadOffersDetails, (state, action) => {
      state.actualOffer = action.payload;
    })
    .addCase(loadReviews, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(loadNearPlaces, (state, action) => {
      state.offersNearby = action.payload;
    })
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(sortOffersCity, (state, action) => {
      state.sortOffers = state.offers.filter((item) => item.city.name === action.payload.name);
    })
    .addCase(filterOffer, (state, action) => {
      switch (action.payload) {
        case 'high':
          state.filterOffers = state.sortOffers.sort((a, b) => a.price - b.price);
          break;
        case 'low':
          state.filterOffers = state.sortOffers.sort((a, b) => b.price - a.price);
          break;
        case 'top':
          state.filterOffers = state.sortOffers.sort((a, b) => b.rating - a.rating);
          break;
        default:
          state.filterOffers = state.sortOffers.slice();
      }
    });
});

export { reducer };
