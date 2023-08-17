import { createSelector } from '@reduxjs/toolkit';
import { State, DetailedOfferData } from '../../types/state';
import { NameSpace } from '../../const';

export const getDetailedOffer = createSelector(
  (state: State) => state[NameSpace.Offer],
  (state: DetailedOfferData) => state.offer
);

export const getFetchingStatusOffer = createSelector(
  (state: State) => state[NameSpace.Offer],
  (state: DetailedOfferData) => state.fetchingStatusOffer
);
