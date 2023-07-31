import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../hooks';
import { changeCity, sortOffersCity } from '../store/action';

type CityListProps = {
  cities: string[];
  actualCity: string;
}

function CityList({cities, actualCity}: CityListProps): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <ul className="locations__list tabs__list">
      {cities.map((city, i) => {
        const keyValue = `${city}-${i}`;
        return (
          <li className="locations__item" key={keyValue}>
            <Link
              className={classNames({
                'locations__item-link': true,
                'tabs__item': true,
                'tabs__item--active': actualCity === city
              })}
              to="#"
              onClick={(evt) => {
                evt.preventDefault();
                dispatch(changeCity(city));
                dispatch(sortOffersCity(city));
              }}
            >
              <span>{city}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default CityList;
