import { useState } from 'react';
import classNames from 'classnames';
import { useAppDispatch } from '../../hooks';
import { filterOffer } from '../../store/action';
import { filterList } from '../../const';

function Sorting() {
  const [active, setActive] = useState(false);
  const [actualFilter, setActualFilter] = useState('Popular');

  const dispatch = useAppDispatch();

  const sortingClass = classNames({
    'places__options': true,
    'places__options--custom': true,
    'places__options--opened': active,
  });

  return (
    <form
      className="places__sorting"
      action="#"
      method="get"
    >
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => setActive((prev) => !prev)}
      >
        {actualFilter}
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul className={sortingClass}>
        {filterList.map((item, i) => {
          const keyValue = `${item.name}-${i}`; // тут можно item.type использовать
          return (
            <li
              key={keyValue}
              className={classNames({
                'places__option': true,
                'places__option--active': actualFilter === item.name
              })}
              tabIndex={0}
              onClick={() => {
                setActualFilter(item.name);
                setActive((prev) => !prev);
                dispatch(filterOffer(item.type));
              }}
            >{item.name}
            </li>
          );
        })}
      </ul>
    </form>
  );
}

export default Sorting;
