import {
  offersLoadingStatus,
  loadOffers,
  sortOffersCity,
  requireAuthorization,
  redirectToRoute,
  loadOffersDetails,
  loadNearPlaces,
  loadReviews
} from './action';
import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { Offer, DetailedOffer } from '../types/offers';
import { Review } from '../types/review';
import { APIRoute, AuthorizationStatus, AppRoute } from '../const';
import { UserData } from '../types/user-data';
import { AuthData } from '../types/auth-data';
import { saveToken, dropToken } from '../services/token';

type Offers = Offer[];
type Reviews = Review[];

export const loadDetails = createAsyncThunk<void, string, {
dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('loadDetails',
  async (id, {dispatch, extra: api}) => {
    dispatch(offersLoadingStatus(true));
    const {data: dataOffer} = await api.get<DetailedOffer>(`${APIRoute.Offers}/${id}`);
    const {data: dataReviews} = await api.get<Reviews>(`${APIRoute.Coments}/${id}`);
    const {data: dataOfferNearby} = await api.get<Offers>(`${APIRoute.Offers}/${id}/nearby`);
    dispatch(offersLoadingStatus(false));
    dispatch(loadOffersDetails(dataOffer));
    dispatch(loadReviews(dataReviews));
    dispatch(loadNearPlaces(dataOfferNearby));
  });


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

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    await api.get(APIRoute.Login)
      .then(() => dispatch(requireAuthorization(AuthorizationStatus.Auth)))
      .catch(() => dispatch(requireAuthorization(AuthorizationStatus.NoAuth)));
  });

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(redirectToRoute(AppRoute.Main));
  });

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  },
);
