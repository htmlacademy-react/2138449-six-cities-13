import {
  offersLoadingStatus,
  offersDetailsLoadingStatus,
  loadOffers,
  loadOffersDetails,
  requireAuthorization,
  redirectToRoute,
  loadNearPlaces,
  loadReviews,
  addReview
} from './action';
import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { Offer, DetailedOffer } from '../types/offers';
import { ReviewData, Review } from '../types/review';
import { UserData } from '../types/user-data';
import { AuthData } from '../types/auth-data';
import { saveToken, dropToken } from '../services/token';
import { APIRoute, AuthorizationStatus, AppRoute } from '../const';

type Offers = Offer[];
type Reviews = Review[];

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('fetchOffers',
  async (_arg, { dispatch, extra: api}) => {
    dispatch(offersLoadingStatus(true));
    const { data } = await api.get<Offers>(APIRoute.Offers);
    dispatch(loadOffers(data));
    dispatch(offersLoadingStatus(false));
  });

export const fetchOfferDetailsAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('fetchOfferDetails',
  async (id, {dispatch, extra: api}) => {
    dispatch(offersDetailsLoadingStatus(true));
    const {data: dataOffer} = await api.get<DetailedOffer>(`${APIRoute.Offers}/${id}`);
    const {data: dataReviews} = await api.get<Reviews>(`${APIRoute.Comments}/${id}`);
    const {data: dataOfferNearby} = await api.get<Offers>(`${APIRoute.Offers}/${id}/nearby`);

    dispatch(loadOffersDetails(dataOffer));
    dispatch(loadReviews(dataReviews));
    dispatch(loadNearPlaces(dataOfferNearby));
    dispatch(offersDetailsLoadingStatus(false));
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

export const postReview = createAsyncThunk<void, {reviewData: ReviewData; offerId: Offer['id']}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'postReview',
  async ({reviewData, offerId}, {dispatch, extra: api}) => {
    const { data } = await api.post<Review>(`${APIRoute.Comments}/${offerId}`, reviewData);
    dispatch(addReview(data));
  }
);
