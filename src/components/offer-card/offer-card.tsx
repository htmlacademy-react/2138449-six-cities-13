import { Link } from 'react-router-dom';
import { useState, useCallback, memo } from 'react';
import classNames from 'classnames';
import { Offer } from '../../types/offers';
import BookmarkButton from '../bookmark-button/bookmark-button';
import { AppRoute } from '../../const';
import { capitalizeString } from '../../utils';

type OfferCardProps = {
  offer: Offer;
  onCardHover?: (id: string | undefined) => void;
  type: 'cities' | 'near-places' | 'favorites';
};

function OfferCard({offer, type, onCardHover}: OfferCardProps): JSX.Element {
  const [activeFavorite, setActiveFavorite] = useState(offer.isFavorite);

  const handleCardMouseEnter = useCallback(() => {
    if (type !== 'near-places') {
      onCardHover?.(offer.id);
    }
  }, [offer.id, onCardHover, type]);

  const handleCardMouseLeave = useCallback(() => {
    if (type !== 'near-places') {
      onCardHover?.(undefined);
    }
  }, [onCardHover, type]);

  return (
    <article
      className={classNames({
        'place-card': true,
        'cities__card': type === 'cities',
        'near-places__card': type === 'near-places',
        'favorites__card': type === 'favorites',
      })}
      onMouseEnter={handleCardMouseEnter}
      onMouseLeave={handleCardMouseLeave}
    >
      {offer.isPremium &&
      <div className="place-card__mark">
        <span>Premium</span>
      </div>}
      <div
        className={classNames({
          'place-card__image-wrapper': true,
          'cities__image-wrapper': type === 'cities',
          'near-places__image-wrapper': type === 'near-places',
          'favorites__image-wrapper': type === 'favorites',
        })}
      >
        <Link to={`${AppRoute.Offer}${offer.id}`}>
          <img
            className="place-card__image"
            src={offer.previewImage}
            alt="Place image"
            width={type === 'favorites' ? 150 : 260}
            height={type === 'favorites' ? 110 : 200}
          />
        </Link>
      </div>
      <div className={classNames({
        'place-card__info': true,
        'favorites__card-info': type === 'favorites',
      })}
      >
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <BookmarkButton
            id={offer.id}
            isFavorite={activeFavorite}
            type='place-card'
            onClick={() => setActiveFavorite((prev) => !prev)}
          />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${Math.round(offer.rating) * 100 / 5}%`}} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Offer}${offer.id}`}>
            {offer.title}
          </Link>
        </h2>
        <p className="place-card__type">{capitalizeString(offer.type)}</p>
      </div>
    </article>
  );
}

export const OfferCardMemo = memo(OfferCard);
