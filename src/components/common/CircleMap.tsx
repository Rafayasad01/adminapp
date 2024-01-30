/* eslint-disable react-hooks/exhaustive-deps */
import { Loader } from '@googlemaps/js-api-loader';
import { useEffect, useRef, useState } from 'react';

type Props = {
  center: google.maps.LatLngLiteral;
  zoom: number;
  radius: number;
};

const loader = new Loader({
  apiKey: 'AIzaSyBp7k8-SYDkEkhcGbXQ9f_fAXPXmwmlvUQ',
  version: 'weekly',
});

function CircleMap({ center, zoom, radius }: Props) {
  const [map, setMap] = useState<any>(null); // reference to the Google Map object
  const [circle, setCircle] = useState<any>(null); // reference to the Circle marker object

  const mapRef = useRef(null);

  useEffect(() => {
    loader.load().then(async () => {
      if (!mapRef.current) {
        return;
      }
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
      const newMap = new google.maps.Map(mapRef.current, options);
      setMap(newMap);
      // const marker = new google.maps.Marker({
      //   position: center,
      //   map,
      //   title: 'Location',
      //   icon: assets.images.iconMap,
      //   animation: google.maps.Animation.DROP,
      // });

      const newCircle = new google.maps.Circle({
        strokeColor: '#1D1D1D',
        strokeOpacity: 0.5,
        strokeWeight: 0.5,
        fillColor: 'rgba(29, 29, 29, 0.1)',
        fillOpacity: 0.5,
        map,
        center,
        radius,
      });

      // setMap(map);
      setCircle(newCircle);
    });
  }, [center, zoom]);

  useEffect(() => {
    if (circle) {
      circle.setRadius(radius);
    }
  }, [radius, circle]);

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
