import { Offer } from '../../types/offers';
import { memo } from 'react';
import classNames from 'classnames';
import { OfferCardMemo } from '../offer-card/offer-card';

type OffersListProps = {
  type: 'cities' | 'near-places' | 'favorites';
  offers: Offer[];
  onListItemHover?: (id: string | undefined) => void;
}

function OffersList({type, offers, onListItemHover}: OffersListProps): JSX.Element {

  const offerListClass = classNames({
    'cities__places-list places__list tabs__content': type === 'cities',
    'near-places__list places__list': type === 'near-places',
    'favorites__places': type === 'favorites',
  });

  return (
    <div className={offerListClass}>
      {offers.map((offer) => (
        <OfferCardMemo
          key={offer.id}
          offer={offer}
          type={type}
          onCardHover={onListItemHover}
        />)
      )}
    </div>
  );
}

export const OffersListMemo = memo(OffersList);
