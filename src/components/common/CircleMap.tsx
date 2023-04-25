import { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

import assets from '../../assets';

type Props = {
  center: google.maps.LatLngLiteral;
  zoom: number;
  radius: number;
};

const loader = new Loader({
  apiKey: 'AIzaSyCQ_g14OfzLkLOD6MGp4iJPuau2mbnjwvw',
  version: 'weekly',
});

function CircleMap({ center, zoom, radius }: Props) {
  const [map, setMap] = useState(null); // reference to the Google Map object
  const [circle, setCircle] = useState(null); // reference to the Circle marker object

  const mapRef = useRef(null);

  useEffect(() => {
    loader.load().then(async (e) => {
      const options: google.maps.MapOptions = {
        center,
        zoom,
        mapTypeId: 'roadmap',
        mapTypeControl: false,
        streetViewControl: false,
        zoomControl: false,
        fullscreenControl: false,
        scaleControl: false,
      };
      const { google } = window;
      const map = new google.maps.Map(mapRef.current!, options);

      const marker = new google.maps.Marker({
        position: center,
        map,
        title: 'Location',
        icon: assets.images.iconMap,
        animation: google.maps.Animation.DROP,
      });

      const circle = new google.maps.Circle({
        strokeColor: '#1D1D1D',
        strokeOpacity: 0.5,
        strokeWeight: 0.5,
        fillColor: 'rgba(29, 29, 29, 0.1)',
        fillOpacity: 0.5,
        map,
        center,
        radius,
      });

      setMap(map);
      setCircle(circle);
    });
  }, []);

  useEffect(() => {
    if (circle) {
      circle.setRadius(radius);
    }
  }, [radius]);

  return (
    <div
      ref={mapRef}
      style={{
        height: '100%',
        width: '100%',
        borderRadius: '0.5rem',
      }}
    />
  );
}

export default CircleMap;
