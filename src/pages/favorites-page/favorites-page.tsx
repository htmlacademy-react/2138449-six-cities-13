import Header from '../../components/header/header';
import {Helmet} from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { CityMap } from '../../const';
import { Offer } from '../../types/offers';
import OffersList from '../../components/offers-list/offers-list';

type FavoritesProps = {
  offers: Offer[];
}

function FavoritesPage({offers}: FavoritesProps): JSX.Element {
  const favoriteOffers = offers.filter((offer) => offer.isFavorite);

  return (
    <>
      <Helmet>
        <title>6 cities: favorites</title>
      </Helmet>
      <div className="page">
        <Header />
        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">

            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>

              <ul className="favorites__list">
                {Object.values(CityMap).map((city) => {
                  const cityFavoriteOffers = favoriteOffers.filter((offer) => offer.city.name === city.name);
                  return (
                    cityFavoriteOffers.length ?
                      <li className="favorites__locations-items" key={city.name} >
                        <div className="favorites__locations locations locations--current">
                          <div className="locations__item">
                            <a className="locations__item-link" href="#">
                              <span>{city.name}</span>
                            </a>
                          </div>
                        </div>
                        <OffersList offers={favoriteOffers} onListItemHover={() => ''} type='favorites'/>
                      </li> : null
                  );
                })}
              </ul>

            </section>
          </div>
        </main>

        <footer className="footer container">
          <Link className="footer__logo-link" to="main.html">
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
