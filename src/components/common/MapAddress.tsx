import { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

import assets from '../../assets';
import { OFFICE_MAP_ADDRESS, OFFICE_MAP_LABEL } from '../../utils/constants';

type Props = {
  addresses: string[];
  zoom: number;
};

const loader = new Loader({
  apiKey: 'AIzaSyBp7k8-SYDkEkhcGbXQ9f_fAXPXmwmlvUQ',
  version: 'weekly',
});


function MapAddress({ addresses, zoom }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const center: google.maps.LatLngLiteral = {
    lat: 0,
    lng: 0
  }

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
      const mapInstance = new google.maps.Map(mapRef.current!, options);
      setMap(mapInstance);
    });
  }, [loader.apiKey]);

  useEffect(() => {
    let addressCount = 0;
    if (map && addresses.length > 0) {
      const geocoder = new google.maps.Geocoder();
      const newMarkers: google.maps.Marker[] = [];
      addresses.forEach((address) => {
        geocoder.geocode({ 'address': address }, (results, status: any) => {
          if (status === 'OK' && status !== 'ZERO_RESULTS') {
            const location = results[0].geometry.location;
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
              addressCount++;
            } else {
              console.error('Invalid geocoder response for address:', address);
            }
          }
          else {
            addressCount++;
            if (addresses.length === addressCount) {
              geocoder.geocode({ 'address': OFFICE_MAP_ADDRESS }, (results, status: any) => {
                if (status === 'OK' && status !== 'ZERO_RESULTS') {
                  const location = results[0].geometry.location;
                  if (location && location.lat() && location.lng()) {
                    const label = {
                      text: OFFICE_MAP_LABEL,
                      color: '#1A1A1A',
                      className: 'map-label-styling'
                    }
                    const marker = new google.maps.Marker({
                      position: location,
                      map,
                      title: address,
                      label: label,
                      icon: assets.images.iconMap,
                      draggable: false,
                      animation: google.maps.Animation.DROP,
                    });
                    newMarkers.push(marker);
                    map.setCenter(location);
                    addressCount++;
                  } else {
                    console.error('Invalid geocoder response for address:', address);
                  }
                }
              });
            };
            //console.error('Geocode was not successful for the following reason:', status);
          }

        });
      });

      setMarkers(newMarkers);
    }
  }, [map, addresses]);

  return (
    <div
      ref={mapRef}
      style={{ height: '100%', width: '100%', borderRadius: '0.5rem' }}
    />
  );
}

export default MapAddress;
