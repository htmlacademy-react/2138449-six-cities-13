import { useEffect } from 'react';
import {Helmet} from 'react-helmet-async';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getOffers, getActiveCity, getFetchingStatusOffers } from '../../store/offers-data/selectors';
import { fetchFavoritesAction, fetchOffersAction } from '../../store/api-action';
import { getAuthorizationStatus } from '../../store/user-data/selectors';
import Header from '../../components/header/header';
import Loader from '../../components/loader/loader';
import Cities from '../../components/cities/cities';
import CitiesEmpty from '../../components/cities/cities-empty';
import { CityListMemo } from '../../components/city-list/city-list';
import { RequestStatus, AuthorizationStatus } from '../../const';

function MainPage(): JSX.Element {
  const activeCity = useAppSelector(getActiveCity);
  const offers = useAppSelector(getOffers);
  const isDataLoading = useAppSelector(getFetchingStatusOffers);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isEmpty = offers.length === 0;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOffersAction());
    dispatch(fetchFavoritesAction());
  }, [dispatch]);

  if (authorizationStatus === AuthorizationStatus.Unknown || isDataLoading === RequestStatus.Pending) {
    return (
      <Loader />
    );
  }

  return (
    <>
      <Helmet>
        <title>6 cities</title>
      </Helmet>

      <div className="page page--gray page--main">
        <Header />

        <main className={classNames({
          'page__main page__main--index': true,
          'page__main--index-empty': isEmpty
        })}
        >

          <CityListMemo activeCity={activeCity.name} />

          {isEmpty ? <CitiesEmpty /> : <Cities offers={offers} activeCity={activeCity} />}
        </main>
      </div>
    </>
  );
}

export default MainPage;

