import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { toast } from 'react-toastify';
import { postReview } from '../../store/api-action';
import { getSendingStatusReview } from '../../store/reviews-data/selectors';
import { dropSendingStatusReview } from '../../store/reviews-data/reviews-data';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { Offer } from '../../types/offers';
import Rating from './rating';
import { MIN_COMMENT_LENGTH, MAX_COMMENT_LENGTH, RequestStatus } from '../../const';

type CommentProps = {
  offerId: Offer['id'];
};

function Comment({offerId}: CommentProps): JSX.Element {
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);

  const dispatch = useAppDispatch();
  const sendStatus = useAppSelector(getSendingStatusReview);

  const isValid =
    comment.length >= MIN_COMMENT_LENGTH &&
    comment.length <= MAX_COMMENT_LENGTH &&
    rating;

  const ratingChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    setRating(evt.target.value);
  };

  const textChangeHandler = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(evt.target.value);
  };

  const formSubmitHandler = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(postReview({reviewData: {comment, rating: Number(rating)}, offerId}));
  };

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      switch (sendStatus) {
        case RequestStatus.Success:
          setComment('');
          setRating('');
          dispatch(dropSendingStatusReview());
          break;
        case RequestStatus.Pending:
          setIsSubmit(true);
          break;
        case RequestStatus.Error:
          toast.warn('Комментарий не отправлен');
          setIsSubmit(false);
          break;
        default:
          setIsSubmit(false);
      }
    }

    return () => {
      isMounted = false;
    };
  }, [sendStatus, dispatch]);

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={formSubmitHandler}
    >
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>

      <Rating onRatingChange={ratingChangeHandler} disabled={isSubmit} ratingValue={rating} />

      <textarea
        onChange={textChangeHandler}
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={comment}
        disabled={isSubmit}
      />

      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe
          your stay with at least{' '}
          <b className="reviews__text-amount">{MIN_COMMENT_LENGTH} characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!isValid || isSubmit}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default Comment;
