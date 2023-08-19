import { createSelector } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { State, OffersData } from '../../types/state';

export const getOffers = createSelector(
  (state: State) => state[NameSpace.Offers],
  (state: OffersData) => state.offers,
);

export const getFetchingStatusOffers = createSelector(
  (state: State) => state[NameSpace.Offers],
  (state: OffersData) => state.fetchingStatusOffers,
);

export const getActiveCity = createSelector(
  (state: State) => state[NameSpace.Offers],
  (state: OffersData) => state.activeCity,
);
