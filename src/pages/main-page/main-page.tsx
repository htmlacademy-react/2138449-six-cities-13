import { useState } from 'react';
import {Helmet} from 'react-helmet-async';
import { Offer } from '../../types/offers';
import { useAppSelector } from '../../hooks';
import CityList from '../../components/city-list/city-list';
import OffersList from '../../components/offers-list/offers-list';
import Sorting from '../../components/sorting/sorting';
import Map from '../../components/map/map';
import Header from '../../components/header/header';

function MainPage(): JSX.Element {
  const [selectedPoint, setSelectedPoint] = useState<Offer | undefined>(
    undefined
  );

  const activeCity = useAppSelector((state) => state.city);
  const sortOffers = useAppSelector((state) => state.sortOffers);

  const handleListItemHover = (id: string) => {
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
                <Sorting />
                <OffersList type='cities' offers={sortOffers} onListItemHover={handleListItemHover}/>
              </section>
              <div className="cities__right-section">
                <section className="cities__map">
                  <Map city={activeCity} points={sortOffers} selectedPoint={selectedPoint} />
                </section>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default MainPage;

