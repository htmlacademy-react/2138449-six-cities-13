import { City } from './types/offers';

export const enum Settings {
  offersCount = 300
}

export const enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/',
}

export const enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const URL_MARKER_DEFAULT =
  './markup/img/pin.svg';

export const URL_MARKER_CURRENT =
  './markup/img/pin-active.svg';

export const CitiesList = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf'
];

export const enum CitiesName {
  Paris = 'Paris',
  Cologne = 'Cologne',
  Brussels = 'Brussels',
  Amsterdam = 'Amsterdam',
  Hamburg = 'Hamburg',
  Dusseldorf ='Dusseldorf'
}

export const CitiesMap: Record<CitiesName, City> = {
  [CitiesName.Paris]: {
    name: CitiesName.Paris,
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13
    }
  },
  [CitiesName.Cologne]: {
    name: CitiesName.Cologne,
    location: {
      latitude: 50.938361,
      longitude: 6.959974,
      zoom: 13
    }
  },
  [CitiesName.Brussels]: {
    name: CitiesName.Brussels,
    location: {
      latitude: 50.846557,
      longitude: 4.351697,
      zoom: 13
    }
  },
  [CitiesName.Amsterdam]: {
    name: CitiesName.Amsterdam,
    location: {
      latitude: 52.37454,
      longitude: 4.897976,
      zoom: 13
    }
  },
  [CitiesName.Hamburg]: {
    name: CitiesName.Hamburg,
    location: {
      latitude: 53.550341,
      longitude: 10.000654,
      zoom: 13
    }
  },
  [CitiesName.Dusseldorf]: {
    name: CitiesName.Dusseldorf,
    location: {
      latitude: 51.225402,
      longitude: 6.776314,
      zoom: 13
    }
  },
} as const;

export const AUTH_TOKEN_KEY_NAME = 'six-cities-token';
