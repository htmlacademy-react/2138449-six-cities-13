import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app/app';
import { reviewsMock } from './mocks/reviews-mock';
import { store } from './store';
import { fetchOffersAction } from './store/api-action';

store.dispatch(fetchOffersAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App
        reviews={reviewsMock}
      />
    </Provider>

  </React.StrictMode>
);
