import { DetailedOffer } from '../../types/offers';

type OfferGalleryProps = {
  offer: DetailedOffer;
}

function OfferGallery({offer}: OfferGalleryProps) {
  return (
    <div className="offer__gallery-container container">
      <div className="offer__gallery">
        {offer.images.map((item, i) => {
          const keyValue = `${item}-${i}`;
          return (
            <div className="offer__image-wrapper" key={keyValue}>
              <img className="offer__image" src={item} alt="Photo studio" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default OfferGallery;
