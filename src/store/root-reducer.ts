import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { offersData } from './offers-data/offers-data';
import { detailedOfferData } from './detailed-offer-data/detailed-offer-data';
import { userData } from './user-data/user-data';
import { reviewsData } from './reviews-data/reviews-data';
import { nearbyData } from './nearby-data/nearby-data';

export const rootReducer = combineReducers({
  [NameSpace.User]: userData.reducer,
  [NameSpace.Offers]: offersData.reducer,
  [NameSpace.Offer]: detailedOfferData.reducer,
  [NameSpace.Reviews]: reviewsData.reducer,
  [NameSpace.NearPlaces]: nearbyData.reducer,
});
