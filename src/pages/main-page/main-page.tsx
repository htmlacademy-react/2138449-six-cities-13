import { useState } from 'react';
import {Helmet} from 'react-helmet-async';
import { Offer, City } from '../../types/offers';
import { useAppSelector } from '../../hooks';
import { CitiesList } from '../../const';
import OffersList from '../../components/offers-list/offers-list';
import Logo from '../../components/logo/logo';
import Map from '../../components/map/map';
import CityList from '../../city-list/city-list';

type MainProps = {
  city: City;
}

function MainPage({ city }: MainProps): JSX.Element {
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
        <header className="header">
          <div className="container">
            <div className="header__wrapper">
              <div className="header__left">
                <Logo />
              </div>
              <nav className="header__nav">
                <ul className="header__nav-list">
                  <li className="header__nav-item user">
                    <a
                      className="header__nav-link header__nav-link--profile"
                      href="#"
                    >
                      <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                      <span className="header__user-name user__name">
                    Oliver.conner@gmail.com
                      </span>
                      <span className="header__favorite-count">3</span>
                    </a>
                  </li>
                  <li className="header__nav-item">
                    <a className="header__nav-link" href="#">
                      <span className="header__signout">Sign out</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>
        <main className="page__main page__main--index">
          <h1 className="visually-hidden">Cities</h1>
          <div className="tabs">
            <section className="locations container">
              <CityList
                cities={CitiesList}
                actualCity={activeCity}
              />
            </section>
          </div>
          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{sortOffers.length} places to stay in {activeCity}</b>
                <form className="places__sorting" action="#" method="get">
                  <span className="places__sorting-caption">Sort by</span>
                  <span className="places__sorting-type" tabIndex={0}>
                  Popular
                    <svg className="places__sorting-arrow" width={7} height={4}>
                      <use xlinkHref="#icon-arrow-select" />
                    </svg>
                  </span>
                  <ul className="places__options places__options--custom places__options--opened">
                    <li
                      className="places__option places__option--active"
                      tabIndex={0}
                    >
                  Popular
                    </li>
                    <li className="places__option" tabIndex={0}>
                    Price: low to high
                    </li>
                    <li className="places__option" tabIndex={0}>
                    Price: high to low
                    </li>
                    <li className="places__option" tabIndex={0}>
                    Top rated first
                    </li>
                  </ul>
                </form>
                <OffersList type='cities' offers={sortOffers} onListItemHover={handleListItemHover}/>
              </section>
              <div className="cities__right-section">
                <section className="cities__map">
                  <Map city={city} points={sortOffers} selectedPoint={selectedPoint} />
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
