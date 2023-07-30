import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { reviewsMock } from './mocks/reviews-mock';
import { Settings } from './const';
import { offers } from './mocks/offers';
import { city } from './mocks/city';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App
      offersCount={Settings.offersCount}
      offers={offers}
      city={city}
      reviews={reviewsMock}
    />
  </React.StrictMode>
);
