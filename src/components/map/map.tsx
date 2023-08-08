import {useRef, useEffect} from 'react';
import {Icon, Marker, layerGroup} from 'leaflet';
import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT } from '../../const';
import { City, Offer } from '../../types/offers';
import useMap from '../../hooks/use-map';

import 'leaflet/dist/leaflet.css';

type MapProps = {
  city: City;
  points: Offer[];
  selectedPoint?: Offer;
};

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [27, 39],
  iconAnchor: [27, 39],
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [27, 39],
  iconAnchor: [27, 39],
});

function Map({city, points, selectedPoint}: MapProps): JSX.Element {

  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);

      points.forEach((point) => {
        const marker = new Marker({
          lat: point.location.latitude,
          lng: point.location.longitude
        });

        marker
          .setIcon(
            selectedPoint !== undefined && point.title === selectedPoint.title
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);
      });

      map.flyTo(
        [
          city.location.latitude,
          city.location.longitude,
        ],
        city.location.zoom
      );

      return () => {
        map.removeLayer(markerLayer);
      };

    }
  }, [map, points, selectedPoint, city]);

  return (
    <div style={{ height: '100%', width: '100%'}} ref={mapRef}></div>
  );
}

export default Map;
