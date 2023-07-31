import { createReducer } from '@reduxjs/toolkit';
import { changeCity, sortOffersCity } from './action';
import { offers } from '../mocks/offers';
import { Offer } from '../types/offers';

type InitialState = {
  city: string;
  offers: Offer[];
  sortOffers: Offer[];
}

const initialState: InitialState = {
  city: 'Amsterdam',
  offers,
  sortOffers: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(sortOffersCity, (state, action) => {
      state.sortOffers = state.offers.filter((item) => item.city.name === action.payload);
    });
});

export { reducer };
