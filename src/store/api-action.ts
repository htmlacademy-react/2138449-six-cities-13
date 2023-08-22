import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { Offer, DetailedOffer } from '../types/offers';
import { ReviewData, Review } from '../types/review';
import { AuthorizedUser } from '../types/user-data';
import { AuthData } from '../types/auth-data';
import { saveToken, dropToken } from '../services/token';
import { APIRoute, AppRoute, NameSpace, FavoriteStatus } from '../const';
import { redirectToRoute } from './action';

type Offers = Offer[];
type Reviews = Review[];

export const fetchOffersAction = createAsyncThunk<Offers, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${NameSpace.Offers}/fetchOffers`,
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Offers>(APIRoute.Offers);

    return data;
  });

export const fetchOfferDetailsAction = createAsyncThunk<DetailedOffer, Offer['id'], {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${NameSpace.Offer}/fetchOfferDetails`,
  async (id, { extra: api }) => {
    const { data } = await api.get<DetailedOffer>(`${APIRoute.Offers}/${id}`);

    return data;
  });

export const fetchReviewsAction = createAsyncThunk<Reviews, Offer['id'], {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${NameSpace.Reviews}/fetchReviews`,
  async (id, {extra: api}) => {
    const { data } = await api.get<Reviews>(`${APIRoute.Comments}/${id}`);

    return data;
  }
);

export const checkAuthAction = createAsyncThunk<AuthorizedUser, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${NameSpace.User}/checkAuth`,
  async (_arg, { extra: api }) => {
    const { data } = await api.get<AuthorizedUser>(APIRoute.Login);

    return data;
  }
);


export const loginAction = createAsyncThunk<AuthorizedUser, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${NameSpace.User}/login`,
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data, status} = await api.post<AuthorizedUser>(APIRoute.Login, {email, password});

    if (status >= 200 && status < 300) {
      saveToken(data.token);
      dispatch(redirectToRoute(AppRoute.Main));
    }

    return data;
  }
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${NameSpace.User}/logout`,
  async(_arg, { extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  }
);

export const postReview = createAsyncThunk<Review, {reviewData: ReviewData; offerId: Offer['id']}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${NameSpace.Reviews}/postReview`,
  async ({reviewData, offerId}, {extra: api}) => {
    const { data } = await api.post<Review>(`${APIRoute.Comments}/${offerId}`, reviewData);

    return data;
  }
);

export const fetchOfferNearbyAction = createAsyncThunk<Offers, Offer['id'], {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${NameSpace.NearPlaces}/fetchNearPlace`,
  async (id, {extra: api}) => {
    const {data} = await api.get<Offers>(`${APIRoute.Offers}/${id}/nearby`);

    return data;
  }
);

export const fetchFavoritesAction = createAsyncThunk<Offers, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${NameSpace.Favorites}/fetchFavorites`,
  async (_arg, {extra: api}) => {
    const { data } = await api.get<Offers>(APIRoute.Favorite);

    return data;
  }
);

export const addFavorite = createAsyncThunk<Offer, Offer['id'], {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${NameSpace.Favorites}/addFavorite`,
  async (id, {extra: api}) => {
    const { data } = await api.post<Offer>(`${APIRoute.Favorite}/${id}/${FavoriteStatus.Add}`);

    return data;
  }
);

export const deleteFavorite = createAsyncThunk<Offer, Offer['id'], {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${NameSpace.Favorites}/deleteFavorite`,
  async (id, {extra: api}) => {
    const { data } = await api.post<Offer>(`${APIRoute.Favorite}/${id}/${FavoriteStatus.Delete}`);

    return data;
  }
);
