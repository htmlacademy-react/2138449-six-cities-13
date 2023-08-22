import { Fragment, ChangeEvent } from 'react';

const ratingMap = {
  '1': 'terribly',
  '2': 'badly',
  '3': 'not bad',
  '4': 'good',
  '5': 'perfect',
};

type RatingProps = {
  onRatingChange: (evt: ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
};

function Rating({onRatingChange, disabled}: RatingProps): JSX.Element {

  return (
    <div className="reviews__rating-form form__rating">
      {Object.entries(ratingMap)
        .map(([score, title]) => (
          <Fragment key={score}>
            <input
              onChange={onRatingChange}
              disabled={disabled}
              className="form__rating-input visually-hidden"
              name="rating"
              value={score}
              id={`${score}-stars`}
              type="radio"
            />
            <label
              htmlFor={`${score}-stars`}
              className="reviews__rating-label form__rating-label"
              title={title}
            >
              <svg className="form__star-image" width={37} height={33}>
                <use xlinkHref="#icon-star" />
              </svg>
            </label>
          </Fragment>
        ))}
    </div>
  );
}

export default Rating;
