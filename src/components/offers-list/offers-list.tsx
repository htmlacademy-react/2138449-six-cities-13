import OfferCard from '../offer-card/offer-card';
import { Offer } from '../../types/offers';
import classNames from 'classnames';

type OffersListProps = {
  type: 'cities' | 'near' | 'favorites';
  offers: Offer[];
  onListItemHover?: (id: string) => void;
}

function OffersList({type, offers, onListItemHover}: OffersListProps): JSX.Element {
  const handleCardHover = (id: string) => {
    onListItemHover?.(id);
  };

  const offerListClass = classNames({
    'places__list': true,
    'cities__places-list': type === 'cities',
    'near-places__list': type === 'near',
    'tabs__content': type === 'cities',
    'favorites__places': type === 'favorites',
  });

  return (
    <div className={offerListClass}>
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
