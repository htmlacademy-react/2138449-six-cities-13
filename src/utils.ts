import { Offer } from './types/offers';

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
  const currentDay = currentDate.getDate();
  const currentMonth = months[currentDate.getMonth()];

  return `${currentDay < 10 ? '0' : ''}${currentDay} ${currentMonth}`;
};

const getDateTime = (date: string): string => date.split(DATE_TIME_SEPARATOR)[DATE_TIME_INDEX];

const sortingList: Record<string, (offers: Offers) => Offers> = {
  popular: (offers: Offers) => offers.slice(),
  high: (offers: Offers) => offers.slice().sort((a: Offer, b: Offer) => a.price - b.price),
  low: (offers: Offers) => offers.slice().sort((a: Offer, b: Offer) => b.price - a.price),
  top: (offers: Offers) => offers.slice().sort((a: Offer, b: Offer) => b.rating - a.rating),
};

export { getFormatDate, getDateTime, sortingList };
