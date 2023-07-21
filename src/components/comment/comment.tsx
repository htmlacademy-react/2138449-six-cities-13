import { useState, FormEvent } from 'react';
import Rating from './rating';

type CommentProps = {
  rating: number;
  text: string;
};

function Comment(): JSX.Element {
  const [form, setForm] = useState<CommentProps>({ rating: 0, text: '' });

  const ratingChangeHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prevState) => ({
      ...prevState,
      rating: Number(evt.target.value),
    }));
  };

  const textChangeHandler = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    setForm({
      ...form,
      text: evt.target.value
    });
  };

  return (
    <form className="reviews__form form" action="#" method="post"
      onSubmit={(evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
      }}
    >
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <Rating onRatingChange={ratingChangeHandler}/>
      <textarea
        onChange={textChangeHandler}
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        defaultValue={''}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe
          your stay with at least{' '}
          <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default Comment;
