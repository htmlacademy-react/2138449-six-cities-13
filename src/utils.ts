import { Offer } from './types/offers';
import { City } from './types/offers';

type Offers = Offer[];

const DATE_TIME_SEPARATOR = 'T';
const DATE_TIME_INDEX = 0;

const getFormatDate = (date: string): string => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const currentDate = new Date(date);
  const currentMonth = months[currentDate.getMonth()];
  const currentYear = currentDate.getFullYear();

  return `${currentMonth} ${currentYear}`;
};

const getDateTime = (date: string): string => date.split(DATE_TIME_SEPARATOR)[DATE_TIME_INDEX];

const sortingList: Record<string, (offers: Offers) => Offers> = {
  popular: (offers: Offers) => offers.slice(),
  high: (offers: Offers) => offers.slice().sort((a: Offer, b: Offer) => a.price - b.price),
  low: (offers: Offers) => offers.slice().sort((a: Offer, b: Offer) => b.price - a.price),
  top: (offers: Offers) => offers.slice().sort((a: Offer, b: Offer) => b.rating - a.rating),
};

const capitalizeString = (string: string) =>
  `${string.charAt(0).toUpperCase()}${string.slice(1)}`;

const getRandomCity = (obj: Record<string, City>) => {
  const keys = Object.keys(obj);
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  return obj[randomKey];
};

export { getFormatDate, getDateTime, sortingList, capitalizeString, getRandomCity };
