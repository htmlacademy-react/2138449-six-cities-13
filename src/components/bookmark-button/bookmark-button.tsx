import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { AppRoute, AuthorizationStatus } from '../../const';
import { Offer } from '../../types/offers';
import { addFavorite, deleteFavorite } from '../../store/api-action';
import { getAuthorizationStatus } from '../../store/user-data/selectors';

type BookmarkButtonProps = {
  id: Offer['id'];
  isFavorite: Offer['isFavorite'];
  onClick: () => void;
}

function BookmarkButton({ id, isFavorite, onClick }: BookmarkButtonProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const handleBookmarkButtonClick = () => {
    if (authorizationStatus === AuthorizationStatus.NoAuth) {
      navigate(AppRoute.Login);
    }

    onClick();

    if (isFavorite) {
      dispatch(deleteFavorite(id));
    } else {
      dispatch(addFavorite(id));
    }
  };

  return (
    <button
      type="button"
      onClick={handleBookmarkButtonClick}
      className={classNames({
        'place-card__bookmark-button button': true,
        'place-card__bookmark-button--active': isFavorite
      })}
    >
      <svg className="place-card__bookmark-icon" width="18" height="19">
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
}

export default BookmarkButton;

