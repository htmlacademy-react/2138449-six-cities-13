import { useState } from 'react';
import {Helmet} from 'react-helmet-async';
import { Offer } from '../../types/offers';
import { useAppSelector } from '../../hooks';
import CityList from '../../components/city-list/city-list';
import OffersList from '../../components/offers-list/offers-list';
import Sorting from '../../components/sorting/sorting';
import Map from '../../components/map/map';
import Header from '../../components/header/header';
import MainEmptyPage from './main-empty-page';
import { sortingList } from '../../utils';

function MainPage(): JSX.Element {
  const [selectedPoint, setSelectedPoint] = useState<Offer | undefined>(
    undefined
  );
  const activeCity = useAppSelector((state) => state.city);
  const offers = useAppSelector((state) => state.offers);
  const [currentSort, setCurrenSort] = useState('popular');

  const sortOffers = offers
    .slice()
    .filter((item) => item.city.name === activeCity.name);

  const handleListItemHover = (id: string | undefined) => {
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
                <CityList
                  actualCity={activeCity.name}
                />
              </section>
            </div>
            <div className="cities">
              <div className="cities__places-container container">
                <section className="cities__places places">
                  <h2 className="visually-hidden">Places</h2>
                  <b className="places__found">{sortOffers.length} places to stay in {activeCity.name}</b>
                  <Sorting
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
          <main className="page__main page__main--index page__main--index-empty">
            <h1 className="visually-hidden">Cities</h1>
            <div className="tabs">
              <section className="locations container">
                <CityList
                  actualCity={activeCity.name}
                />
              </section>
            </div>
            <MainEmptyPage />
          </main>}
      </div>
    </>
  );
}

export default MainPage;

