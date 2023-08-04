import { createReducer } from '@reduxjs/toolkit';
import { changeCity, sortOffersCity, filterOffer } from './action';
import { offers } from '../mocks/offers';
import { Offer } from '../types/offers';

type InitialState = {
  city: string;
  offers: Offer[];
  sortOffers: Offer[];
  filterOffers: Offer[];
}

const initialState: InitialState = {
  city: 'Paris',
  offers,
  sortOffers: [],
  filterOffers: []
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(sortOffersCity, (state, action) => {
      state.sortOffers = state.offers.filter((item) => item.city.name === action.payload);
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
