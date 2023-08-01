import { createAction } from '@reduxjs/toolkit';

export const changeCity = createAction<string>('changeCity');

export const sortOffersCity = createAction<string>('sortOffersCity');

export const filterOffer = createAction<string>('filterOffer');
