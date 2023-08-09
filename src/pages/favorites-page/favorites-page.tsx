import Header from '../../components/header/header';
import OffersList from '../../components/offers-list/offers-list';
import { Offer } from '../../types/offers';
import {Helmet} from 'react-helmet-async';
import { Link } from 'react-router-dom';

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
                <li className="favorites__locations-items">
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <Link className="locations__item-link" to="#">
                        <span>Amsterdam</span>
                      </Link>
                    </div>
                  </div>
                  <OffersList offers={favoriteOffers} onListItemHover={() => ''} type='favorites'/>
                </li>
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
