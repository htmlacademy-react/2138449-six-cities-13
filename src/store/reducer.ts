import {
  changeCity,
  loadOffers,
  offersLoadingStatus,
  offersDetailsLoadingStatus,
  requireAuthorization,
  loadOffersDetails,
  loadNearPlaces,
  loadReviews,
  addReview,
  dropSendStatus,
} from './action';
import { postReview } from './api-action';
import { createReducer } from '@reduxjs/toolkit';
import { Offer, City, DetailedOffer } from '../types/offers';
import { Review } from '../types/review';
import { CityMap, AuthorizationStatus, RequestStatus } from '../const';

type Offers = Offer[];
type Reviews = Review[];

type InitialState = {
  city: City;
  offers: Offer[];
  sortOffers: Offer[];
  filterOffers: Offer[];
  loadingStatus: boolean;
  offersDetailsLoadingStatus: boolean;
  authorizationStatus: AuthorizationStatus;
  actualOffer: DetailedOffer | null;
  reviews: Reviews;
  offersNearby: Offers;
  sendingReviewStatus: string;
}

const initialState: InitialState = {
  city: CityMap.Paris,
  offers: [],
  sortOffers: [],
  filterOffers: [],
  loadingStatus: false,
  offersDetailsLoadingStatus: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  actualOffer: null,
  reviews: [],
  offersNearby: [],
  sendingReviewStatus: RequestStatus.Unsent,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(offersLoadingStatus, (state, action) => {
      state.loadingStatus = action.payload;
    })
    .addCase(offersDetailsLoadingStatus, (state, action) => {
      state.offersDetailsLoadingStatus = action.payload;
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
    .addCase(postReview.pending, (state) => {
      state.sendingReviewStatus = RequestStatus.Pending;
    })
    .addCase(postReview.fulfilled, (state) => {
      state.sendingReviewStatus = RequestStatus.Success;
    })
    .addCase(postReview.rejected, (state) => {
      state.sendingReviewStatus = RequestStatus.Error;
    })
    .addCase(dropSendStatus, (state) => {
      state.sendingReviewStatus = RequestStatus.Unsent;
    })
    .addCase(addReview, (state, action) => {
      state.reviews.push(action.payload);
    })
    .addCase(loadNearPlaces, (state, action) => {
      state.offersNearby = action.payload;
    })
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    });
});

export { reducer };
