import React, { Fragment } from 'react';

const ratingMap = {
  '5': 'perfect',
  '4': 'good',
  '3': 'not bad',
  '2': 'badly',
  '1': 'terribly',
};

type RatingProps = {
  onRatingChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
};

function Rating({onRatingChange}: RatingProps): JSX.Element {
  return (
    <div className="reviews__rating-form form__rating">
      {Object.entries(ratingMap)
        .reverse()
        .map(([score, title]) => (
          <Fragment key={score}>
            <input
              onChange={onRatingChange}
              className="form__rating-input visually-hidden"
              name="rating"
              value={score}
              id={`${score}-stars`}
              type="radio"
              //checked={rating === score}
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
