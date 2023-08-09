import { createAction } from '@reduxjs/toolkit';
import { Offer, City } from '../types/offers';
import { AppRoute, AuthorizationStatus } from '../const';

type Offers = Offer[];

export const changeCity = createAction<City>('changeCity');

export const sortOffersCity = createAction<City>('sortOffersCity');

export const filterOffer = createAction<string>('filterOffer');

export const loadOffers = createAction<Offers>('loadOffers');

export const offersLoadingStatus = createAction<boolean>('offersLoadingStatus');

export const requireAuthorization = createAction<AuthorizationStatus>('requireAuthorization');

export const redirectToRoute = createAction<AppRoute>('redirectToRoute');
