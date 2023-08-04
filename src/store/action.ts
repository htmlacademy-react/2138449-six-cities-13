import { createAction } from '@reduxjs/toolkit';
import { Offer, City } from '../types/offers';

type Offers = Offer[];

export const changeCity = createAction<City>('changeCity');

export const sortOffersCity = createAction<string>('sortOffersCity');

export const filterOffer = createAction<string>('filterOffer');

export const loadOffers = createAction<Offers>('loadOffers');

export const offersLoadingStatus = createAction<boolean>('offersLoadingStatus');
