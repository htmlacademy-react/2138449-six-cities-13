import { createReducer } from '@reduxjs/toolkit';
import { changeCity, sortOffersCity, filterOffer, loadOffers, offersLoadingStatus } from './action';
import { Offer, City } from '../types/offers';
import { CityMap } from '../const';

type InitialState = {
  city: City;
  offers: Offer[];
  sortOffers: Offer[];
  filterOffers: Offer[];
  loadingStatus: boolean;
}

const initialState: InitialState = {
  city: CityMap.Paris,
  offers: [],
  sortOffers: [],
  filterOffers: [],
  loadingStatus: false,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(sortOffersCity, (state, action) => {
      state.sortOffers = state.offers.filter((item) => item.city.name === action.payload.name);
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(offersLoadingStatus, (state, action) => {
      state.loadingStatus = action.payload;
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
