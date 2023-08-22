import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, RequestStatus } from '../../const';
import { DetailedOfferData } from '../../types/state';
import { fetchOfferDetailsAction } from '../api-action';

const initialState: DetailedOfferData = {
  offer: null,
  fetchingStatusOffer: RequestStatus.Unsent,
};

export const detailedOfferData = createSlice({
  name: NameSpace.Offer,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOfferDetailsAction.pending, (state) => {
        state.fetchingStatusOffer = RequestStatus.Pending;
      })
      .addCase(fetchOfferDetailsAction.fulfilled, (state, action) => {
        state.fetchingStatusOffer = RequestStatus.Success;
        state.offer = action.payload;
      })
      .addCase(fetchOfferDetailsAction.rejected, (state) => {
        state.fetchingStatusOffer = RequestStatus.Error;
      });
  },
});
