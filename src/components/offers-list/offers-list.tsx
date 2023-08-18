import OfferCard from '../offer-card/offer-card';
import { Offer } from '../../types/offers';
import classNames from 'classnames';

type OffersListProps = {
  type: 'cities' | 'near' | 'favorites';
  offers: Offer[];
  onListItemHover?: (id: string | null) => void;
}

function OffersList({type, offers, onListItemHover}: OffersListProps): JSX.Element {

  const offerListClass = classNames({
    'places__list': true,
    'cities__places-list tabs__content': type === 'cities',
    'near-places__list': type === 'near'
  });

  return (
    <div className={offerListClass}>
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          {...offer}
          onCardHover={onListItemHover}
        />)
      )}
    </div>
  );
}

export default OffersList;
