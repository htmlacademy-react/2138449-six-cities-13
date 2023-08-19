import { useState } from 'react';
import { useEffect } from 'react';
import classNames from 'classnames';
import {Helmet} from 'react-helmet-async';
import { Offer } from '../../types/offers';
import { useAppSelector, useAppDispatch } from '../../hooks';
import OffersList from '../../components/offers-list/offers-list';
import Cities from '../../components/cities/cities';
import CitiesEmpty from '../../components/cities/cities-empty';
import { CityListMemo } from '../../components/city-list/city-list';
import Map from '../../components/map/map';
import Header from '../../components/header/header';
import MainEmptyPage from './main-empty-page';
import { sortingList } from '../../utils';
import { getOffers, getActiveCity } from '../../store/offers-data/selectors';
import { fetchFavoritesAction } from '../../store/api-action';

function MainPage(): JSX.Element {
  const activeCity = useAppSelector(getActiveCity);
  const offers = useAppSelector(getOffers);
  const isEmpty = offers.length === 0;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFavoritesAction());
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>6 cities</title>
      </Helmet>
      <div className="page page--gray page--main">
        <Header />

        <main
          className={classNames({
            'page__main page__main--index': true,
            'page__main--index-empty': isEmpty
          })}
        >
          <CityListMemo actualCity={activeCity.name} />

          {isEmpty ? <CitiesEmpty /> : <Cities offers={offers} activeCity={activeCity} />}
        </main>
      </div>
    </>
  );
}

export default MainPage;

