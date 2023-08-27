import { useState, useCallback, useMemo } from 'react';
import { PlaceSortMemo } from '../sorting/sorting';
import { OffersListMemo } from '../offers-list/offers-list';
import Map from '../map/map';
import { Offer, City } from '../../types/offers';
import { sortingList } from '../../utils';
import CitiesEmpty from './cities-empty';

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

  const sortByCity = useMemo(
    () => offers
      .slice()
      .filter((item) => item.city.name === activeCity.name),
    [activeCity.name, offers]);

  const sortByCategory = useMemo(
    () => sortingList[currentSort](sortByCity),
    [currentSort, sortByCity]);

  const handleListItemHover = useCallback((id: string | undefined) => {
    if (!id) {
      setSelectedPoint(undefined);
    }

    const currentPoint = sortByCity.find((item) => item.id === id);

    setSelectedPoint(currentPoint);
  }, [sortByCity]);

  const handleChangeSort = useCallback((newSort: string) => {
    setCurrenSort(newSort);
  }, []);

  return (
    sortByCity.length ?
      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{sortByCity.length} place{sortByCity.length > 1 && 's'} to stay in {activeCity.name}</b>
            <PlaceSortMemo onChange={handleChangeSort} />

            <OffersListMemo
              type='cities'
              offers={sortByCategory}
              onListItemHover={handleListItemHover}
            />
          </section>
          <div className="cities__right-section">
            <section className="cities__map map">
              <Map
                city={activeCity}
                points={sortByCity}
                selectedPoint={selectedPoint}
                detailedOffer={undefined}
              />
            </section>
          </div>
        </div>
      </div>
      : <CitiesEmpty />
  );
}

export default Cities;
