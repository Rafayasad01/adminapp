import { Loader } from '@googlemaps/js-api-loader';
import { useEffect, useRef, useState } from 'react';

import assets from '../../assets';

type Props = {
  addresses: string[];
  zoom: number;
};

const loader = new Loader({
  apiKey: 'AIzaSyBp7k8-SYDkEkhcGbXQ9f_fAXPXmwmlvUQ',
  version: 'weekly',
});

function MapAddresses({ addresses, zoom }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();
  // const [markers, setMarkers] = useState<google.maps.Marker[]>([]);

  useEffect(() => {
    loader.load().then(async () => {
      if (!mapRef.current) {
        return;
      }
      const options: google.maps.MapOptions = {
        center: {
          lat: 0,
          lng: 0,
        },
        zoom,
        mapTypeId: 'roadmap',
        mapTypeControl: false,
        streetViewControl: false,
        zoomControl: false,
        fullscreenControl: false,
        scaleControl: false,
      };
      const mapInstance = new google.maps.Map(mapRef.current, options);
      setMap(mapInstance);
    });
  }, [zoom]);

  useEffect(() => {
    if (map && addresses.length > 0) {
      const geocoder = new google.maps.Geocoder();
      const newMarkers: google.maps.Marker[] = [];
      addresses.forEach((address) => {
        geocoder.geocode({ address }, (results, status: any) => {
          if (status === 'OK' && status !== 'ZERO_RESULTS') {
            const { location } = results[0].geometry;
            if (location && location.lat() && location.lng()) {
              const marker = new google.maps.Marker({
                position: location,
                map,
                title: address,
                icon: assets.images.iconMap,
                draggable: false,
                animation: google.maps.Animation.DROP,
              });
              newMarkers.push(marker);
              map.setCenter(location);
            } else {
              // console.error('Invalid geocoder response for address:', address);
            }
          } else {
            // console.error('Geocode was not successful for the following reason:', status);
          }
        });
      });

      // setMarkers(newMarkers);
    }
  }, [map, addresses]);

  return (
    <div
      ref={mapRef}
      style={{ height: '100%', width: '100%', borderRadius: '0.5rem' }}
    />
  );
}

export default MapAddresses;
