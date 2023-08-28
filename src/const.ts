import { City } from './types/offers';

export const CLOSE_MESSAGE_DELAY = 300;

export const MIN_COMMENT_LENGTH = 50;
export const MAX_COMMENT_LENGTH = 300;

export const enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/',
  NotFound = '/not-found-screen',
}

export const enum APIRoute {
  Offers = '/offers',
  Comments = '/comments',
  Login = '/login',
  Logout = '/logout',
  Favorite = '/favorite',
  Error = 'ERROR',
}

export const enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const URL_MARKER_DEFAULT = '/img/pin.svg';

export const URL_MARKER_CURRENT = '/img/pin-active.svg';

export const filterList = [
  {
    name: 'Popular',
    type: 'popular'
  },
  {
    name: 'Price: low to high',
    type: 'high'
  },
  {
    name: 'Price: high to low',
    type: 'low'
  },
  {
    name: 'Top rated first',
    type: 'top'
  },
];

export const enum CityName {
  Paris = 'Paris',
  Cologne = 'Cologne',
  Brussels = 'Brussels',
  Amsterdam = 'Amsterdam',
  Hamburg = 'Hamburg',
  Dusseldorf ='Dusseldorf'
}

export const CityMap: Record<CityName, City> = {
  [CityName.Paris]: {
    name: CityName.Paris,
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13
    }
  },
  [CityName.Cologne]: {
    name: CityName.Cologne,
    location: {
      latitude: 50.938361,
      longitude: 6.959974,
      zoom: 13
    }
  },
  [CityName.Brussels]: {
    name: CityName.Brussels,
    location: {
      latitude: 50.846557,
      longitude: 4.351697,
      zoom: 13
    }
  },
  [CityName.Amsterdam]: {
    name: CityName.Amsterdam,
    location: {
      latitude: 52.37454,
      longitude: 4.897976,
      zoom: 13
    }
  },
  [CityName.Hamburg]: {
    name: CityName.Hamburg,
    location: {
      latitude: 53.550341,
      longitude: 10.000654,
      zoom: 13
    }
  },
  [CityName.Dusseldorf]: {
    name: CityName.Dusseldorf,
    location: {
      latitude: 51.225402,
      longitude: 6.776314,
      zoom: 13
    }
  },
} as const;

export const AUTH_TOKEN_KEY_NAME = 'six-cities-token';

export const enum RequestStatus {
  Unsent = 'UNSENT',
  Pending = 'PENDING',
  Success = 'SUCCESS',
  Error = 'ERROR'
}

export const enum NameSpace {
  Offers = 'OFFERS',
  Offer = 'OFFER',
  NearPlaces = 'NEAR_PLACES',
  Reviews = 'REVIEWS',
  Favorites = 'FAVORITES',
  User = 'USER'
}


export const enum FavoriteStatus {
  Add = 1,
  Delete = 0
}
