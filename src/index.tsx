import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app/app';
import { reviewsMock } from './mocks/reviews-mock';
import { Settings } from './const';
import { offers } from './mocks/offers';
import { city } from './mocks/city';
import { store } from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App
        offersCount={Settings.offersCount}
        offers={offers}
        city={city}
        reviews={reviewsMock}
      />
    </Provider>

  </React.StrictMode>
);
