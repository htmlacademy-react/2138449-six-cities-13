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

export const AUTH_TOKEN_KEY_NAME = 'six-cities-token';
