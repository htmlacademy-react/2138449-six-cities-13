import OfferCard from '../offer-card/offer-card';
import { Offer } from '../../types/offers';

type OffersListProps = {
  offers: Offer[];
  onListItemHover: (id: string) => void;
}

function OffersList({offers, onListItemHover}: OffersListProps): JSX.Element {
  const handleCardHover = (id: string) => {
    onListItemHover(id);
  };

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          {...offer}
          handleCardHover={() => handleCardHover(offer.id)}
        />)
      )}
    </div>
  );
}

export default OffersList;
