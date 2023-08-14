import { createAction } from '@reduxjs/toolkit';
import { Offer, City, DetailedOffer } from '../types/offers';
import { Review } from '../types/review';
import { AppRoute, AuthorizationStatus } from '../const';

type Offers = Offer[];
type Reviews = Review[];

export const changeCity = createAction<City>('changeCity');

export const filterOffer = createAction<string>('filterOffer');

export const loadOffers = createAction<Offers>('loadOffers');

export const loadOffersDetails = createAction<DetailedOffer>('loadOffersDetails');

export const loadReviews = createAction<Reviews>('loadReviews');

export const loadNearPlaces = createAction<Offers>('loadNearPlaces');

export const offersLoadingStatus = createAction<boolean>('offersLoadingStatus');

export const requireAuthorization = createAction<AuthorizationStatus>('requireAuthorization');

export const redirectToRoute = createAction<AppRoute>('redirectToRoute');

export const addReview = createAction<Review>('addReview');

export const dropSendStatus = createAction('dropSendStatus');
