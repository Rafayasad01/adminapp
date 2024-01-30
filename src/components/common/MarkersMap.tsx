/* eslint-disable react-hooks/exhaustive-deps */
import { Loader } from '@googlemaps/js-api-loader';
import { useEffect, useRef } from 'react';
import { Marker } from '../../interfaces/map.interface';

import assets from '../../assets';

type Props = {
  markers: Marker[];
  zoom: number;
};

const loader = new Loader({
  apiKey: 'AIzaSyBp7k8-SYDkEkhcGbXQ9f_fAXPXmwmlvUQ',
  version: 'weekly',
});

function MarkersMap({ markers, zoom }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<google.maps.Marker>();
  useEffect(() => {
    loader.load().then(async () => {
      if (!mapRef.current) {
        return;
      }
      if (markers.length > 0) {
        const options: google.maps.MapOptions = {
          center: { lat: markers[0].lat, lng: markers[0].lng },
          zoom,
          mapTypeId: 'roadmap',
          mapTypeControl: false,
          streetViewControl: false,
          zoomControl: false,
          fullscreenControl: false,
          scaleControl: false,
        };
        const map = new google.maps.Map(mapRef.current, options);
        markers.forEach((marker) => {
          const markerVal = new window.google.maps.Marker({
            position: { lat: marker.lat, lng: marker.lng },
            map,
            title: marker.name,
            icon: assets.images.iconMap,
            draggable: false,
            animation: google.maps.Animation.DROP,
          });

          markerRef.current = markerVal;
        });
      }
    });
  }, [markers]);

  return (
    <div
      ref={mapRef}
      style={{ height: '100%', width: '100%', borderRadius: '0.5rem' }}
    />
  );
}

export default MarkersMap;
