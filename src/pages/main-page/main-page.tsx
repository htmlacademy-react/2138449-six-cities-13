import { useState } from 'react';
//import { useEffect } from 'react';
//import classNames from 'classnames';
import {Helmet} from 'react-helmet-async';
import { Offer } from '../../types/offers';
import { useAppSelector } from '../../hooks';
import OffersList from '../../components/offers-list/offers-list';
import { CityListMemo } from '../../components/city-list/city-list';
import Map from '../../components/map/map';
import Header from '../../components/header/header';
import MainEmptyPage from './main-empty-page';
import { sortingList } from '../../utils';
import { getOffers, getActiveCity } from '../../store/offers-data/selectors';
//import { fetchFavoritesAction } from '../../store/api-action';
import { PlaceSortMemo } from '../../components/sorting/sorting';

function MainPage(): JSX.Element {
  const activeCity = useAppSelector(getActiveCity);
  const offers = useAppSelector(getOffers);

  const sortOffers = offers
    .slice()
    .filter((item) => item.city.name === activeCity.name);

  const [currentSort, setCurrenSort] = useState('popular');
  const [selectedPoint, setSelectedPoint] = useState<Offer | undefined>(
    undefined
  );

  const handleListItemHover = (id: string | null) => {
    if (!id) {
      setSelectedPoint(undefined);
    }

    const currentPoint = sortOffers.find((point) => point.id === id);
    setSelectedPoint(currentPoint);
  };

  return (
    <>
      <Helmet>
        <title>6 cities</title>
      </Helmet>
      <div className="page page--gray page--main">
        <Header />
        {sortOffers.length ?
          <main className="page__main page__main--index">
            <h1 className="visually-hidden">Cities</h1>
            <div className="tabs">
              <section className="locations container">
                <CityListMemo
                  actualCity={activeCity.name}
                />
              </section>
            </div>
            <div className="cities">
              <div className="cities__places-container container">
                <section className="cities__places places">
                  <h2 className="visually-hidden">Places</h2>
                  <b className="places__found">{sortOffers.length} places to stay in {activeCity.name}</b>
                  <PlaceSortMemo
                    onChange={(newSort) => setCurrenSort(newSort)}
                  />
                  <OffersList
                    type='cities'
                    offers={sortingList[currentSort](sortOffers)}
                    onListItemHover={handleListItemHover}
                  />
                </section>
                <div className="cities__right-section">
                  <section className="cities__map">
                    <Map
                      city={activeCity}
                      points={sortOffers}
                      selectedPoint={selectedPoint}
                    />
                  </section>
                </div>
              </div>
            </div>
          </main>
          :
          <MainEmptyPage />}
      </div>
    </>
  );
}

export default MainPage;

