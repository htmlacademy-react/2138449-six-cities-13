import { Offer } from '../../types/offers';
import { memo } from 'react';
import classNames from 'classnames';
import { OfferCardMemo } from '../offer-card/offer-card';

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
        <OfferCardMemo
          key={offer.id}
          {...offer}
          onCardHover={onListItemHover}
        />)
      )}
    </div>
  );
}

export const OffersListMemo = memo(OffersList);
