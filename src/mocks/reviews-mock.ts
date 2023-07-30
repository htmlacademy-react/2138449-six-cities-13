import { Review } from '../types/review';

export const reviewsMock: Review[] = [
  {
    'id': '01',
    'date': '2011-02-12T14:15:24.569Z',
    'user': {
      'name': 'Stiv Jobs',
      'avatarUrl': 'img/avatar-max.jpg',
      'isPro': true
    },
    'comment': 'Hey, i am Apple creator',
    'rating': 1
  },
  {
    'id': '02',
    'date': '2022-09-02T14:15:24.569Z',
    'user': {
      'name': 'Stiv Voznyak',
      'avatarUrl': 'img/avatar-max.jpg',
      'isPro': false
    },
    'comment': 'Hey, i am Apple creator too',
    'rating': 2
  },
  {
    'id': '03',
    'date': '2019-07-09T14:15:24.569Z',
    'user': {
      'name': 'Oliver Conner',
      'avatarUrl': 'img/avatar-max.jpg',
      'isPro': true
    },
    'comment': 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    'rating': 3
  },
  {
    'id': '04',
    'date': '2020-07-09T14:15:24.569Z',
    'user': {
      'name': 'Linus Torvalds',
      'avatarUrl': 'img/avatar-max.jpg',
      'isPro': false
    },
    'comment': 'Do you like Linux?',
    'rating': 4
  },
  {
    'id': '05',
    'date': '2021-01-01T12:00:01.569Z',
    'user': {
      'name': 'Rupert Pumpkin',
      'avatarUrl': 'img/avatar-max.jpg',
      'isPro': true
    },
    'comment': 'Nobody knows me',
    'rating': 5
  },
];
