import { Link } from 'react-router-dom';
import { Offer } from '../../types/offers';
import { OfferCardMemo } from '../offer-card/offer-card';

type Offers = Offer[];
type FavoritesOffersProps = {
  offers: Array<[string, Offers]>;
}

function FavoritesOffers({offers}: FavoritesOffersProps) {
  return (
    <div className="page__favorites-container container">
      <section className="favorites">
        <h1 className="favorites__title">Saved listing</h1>
        <ul className="favorites__list">
          {offers.map(([city, offersList], index) => {
            const keyValue = `${city}-${index}`;
            return (
              <li className="favorites__locations-items" key={keyValue}>
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <Link className="locations__item-link" to="#">
                      <span>{city}</span>
                    </Link>
                  </div>
                </div>
                <div className="favorites__places">
                  {offersList.map((offer) => (
                    <OfferCardMemo
                      key={offer.id}
                      offer={offer}
                      type='favorites'
                    />)
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}

export default FavoritesOffers;
