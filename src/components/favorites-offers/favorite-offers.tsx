//import { Offer } from '../../types/offers';
//import OfferCard from '../offer-card/offer-card';

//type FavoritesOffersProps = {
//  offers: Array<[string, Offer[]]>;
// }

function FavoritesOffers() {
  return (
    <div className="page__favorites-container container">
      <section className="favorites">
        <h1 className="favorites__title">Saved listing</h1>
        <ul className="favorites__list">
          <li className="favorites__locations-items">
            <div className="favorites__locations locations locations--current">
              <div className="locations__item">
                <a className="locations__item-link" href="#">
                  <span>Amsterdam</span>
                </a>
              </div>
            </div>
            <div className="favorites__places"></div>
          </li>
        </ul>
      </section>
    </div>
  );
}

export default FavoritesOffers;
