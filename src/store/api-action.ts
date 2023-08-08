import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { Offer } from '../types/offers';
import { APIRoute } from '../const';
import { offersLoadingStatus, loadOffers, sortOffersCity } from './action';

type Offers = Offer[];

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('fetchOffers',
  async (_arg, { dispatch, getState, extra: api}) => {
    const {city} = getState();
    dispatch(offersLoadingStatus(true));
    const { data } = await api.get<Offers>(APIRoute.Offers);
    dispatch(offersLoadingStatus(false));
    dispatch(loadOffers(data));
    dispatch(sortOffersCity(city));
  });
