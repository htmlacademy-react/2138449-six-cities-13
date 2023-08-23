import { Fragment, ChangeEvent } from 'react';

const ratingMap = {
  '5': 'perfect',
  '4': 'good',
  '3': 'not bad',
  '2': 'badly',
  '1': 'terribly',
};

type RatingProps = {
  onRatingChange: (evt: ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
  ratingValue: string;
};

function Rating({onRatingChange, disabled, ratingValue}: RatingProps): JSX.Element {

  return (
    <div className="reviews__rating-form form__rating">
      {Object.entries(ratingMap)
        .reverse()
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
              checked={ratingValue === score}
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
