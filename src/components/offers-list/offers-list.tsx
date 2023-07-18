import OfferCard from '../offer-card/offer-card';
import { useState } from 'react';
import { Offer } from '../../types/offers';

type OffersListProps = {
  offers: Offer[];
}

function OffersList({offers}: OffersListProps): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentCard, setCurrentCard] = useState('');

  const handleCardMouseEnter = (id: string) => {
    setCurrentCard(id);
  };

  const handleCardMouseLeave = () => {
    setCurrentCard('');
  };

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          {...offer}
          onCardMouseEnter={() => handleCardMouseEnter(offer.id)}
          onCardMouseLeave={() => handleCardMouseLeave()}
        />)
      )}
    </div>
  );
}

export default OffersList;
