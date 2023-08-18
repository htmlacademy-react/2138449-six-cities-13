import { useState, useCallback } from 'react';
import { PlaceSortMemo } from '../sorting/sorting';
import OffersList from '../offers-list/offers-list';
import Map from '../map/map';
import { Offer, City } from '../../types/offers';
import { sortingList } from '../../utils';

type Offers = Offer[];

type CitiesProps = {
  offers: Offers;
  activeCity: City;
}

function Cities({offers, activeCity}: CitiesProps) {
  const [selectedPoint, setSelectedPoint] = useState<Offer | undefined>(
    undefined
  );

  const [currentSort, setCurrenSort] = useState('popular');

  const sortOffers = offers
    .slice()
    .filter((item) => item.city.name === activeCity.name);

  const handleListItemHover = (id: string | null) => {
    const currentPoint = sortOffers.find((item) => item.id === id);

    setSelectedPoint(currentPoint);
  };

  const handleChangeSort = useCallback((newSort: string) => {
    setCurrenSort(newSort);
  }, []);

  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{sortOffers.length} places to stay in {activeCity.name}</b>
          <PlaceSortMemo onChange={handleChangeSort} />

          <OffersList
            type='cities'
            offers={sortingList[currentSort](sortOffers)}
            onListItemHover={handleListItemHover}
          />
        </section>
        <div className="cities__right-section">
          <section className="cities__map">
            <Map
              city={activeCity}
              points={sortOffers}
              selectedPoint={selectedPoint}
            />
          </section>
        </div>
      </div>
    </div>
  );
}

export default Cities;
