import classNames from 'classnames';
import {Helmet} from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getFavorites } from '../../store/favorites-data/selectors';
import { getFetchingStatusFavorites } from '../../store/favorites-data/selectors';
import Loader from '../../components/loader/loader';
import Header from '../../components/header/header';
import FavoritesOffers from '../../components/favorites-offers/favorite-offers';
import FavoritesOffersEmpty from '../../components/favorites-offers/favorite-offers-empty';
import { fetchFavoritesAction } from '../../store/api-action';
import { Offer } from '../../types/offers';
import { AppRoute, RequestStatus } from '../../const';

type Offers = Offer[];

const getFavoritesByCity = (favorites: Offers) => favorites.reduce<{[key: string]: Offers}>((acc, current) => {
  const city = current.city.name;

  if (!(city in acc)) {
    acc[city] = [];
  }
  acc[city].push(current);

  return acc;
}, {});

function FavoritesPage(): JSX.Element {
  const favorites = useAppSelector(getFavorites);
  const fetchingStatus = useAppSelector(getFetchingStatusFavorites);
  const favoriteByCity = getFavoritesByCity(favorites);
  const isEmpty = favorites.length === 0;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFavoritesAction());
  }, [dispatch]);

  if (fetchingStatus === RequestStatus.Pending) {
    return (
      <Loader />
    );
  }

  return (
    <>
      <Helmet>
        <title>6 cities: favorites</title>
      </Helmet>
      <div className={classNames('page', {['page--favorites-empty']: isEmpty})}>
        <Header />

        <main className={classNames('page__main', 'page__main--favorites', {['page__main--favorites-empty']: isEmpty})}>
          {isEmpty ? <FavoritesOffersEmpty /> : <FavoritesOffers offers={Object.entries(favoriteByCity)} />}
        </main>

        <footer className="footer container">
          <Link className="footer__logo-link" to={AppRoute.Main}>
            <img
              className="footer__logo"
              src="img/logo.svg"
              alt="6 cities logo"
              width={64}
              height={33}
            />
          </Link>
        </footer>
      </div>
    </>
  );
}

export default FavoritesPage;
