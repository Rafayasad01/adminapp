import { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { Marker } from '../../../interfaces/map.interface';
import assets from '../../../assets';

type Props = {
  markers: Marker[];
  zoom: number;
};

const loader = new Loader({
  apiKey: 'AIzaSyBp7k8-SYDkEkhcGbXQ9f_fAXPXmwmlvUQ',
  version: 'weekly',
});
const googleMapsStyles: google.maps.MapTypeStyle[] = [
  {
    elementType: 'geometry',
    stylers: [
      {
        color: '#f5f5f5',
      },
    ],
  },
  {
    elementType: 'labels',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#52525B',
      },
    ],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#f5f5f5',
      },
    ],
  },
  {
    featureType: 'administrative.land_parcel',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#D6D3D1',
      },
    ],
  },
  {
    featureType: 'administrative.neighborhood',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [
      {
        color: '#F4F4F5',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#737373',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [
      {
        color: '#e5e5e5',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#A3A3A3',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [
      {
        color: '#ffffff',
      },
    ],
  },
  {
    featureType: 'road.arterial',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#737373',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [
      {
        color: '#D4D4D8',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#52525B',
      },
    ],
  },
  {
    featureType: 'road.local',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#A3A3A3',
      },
    ],
  },
  {
    featureType: 'transit.line',
    elementType: 'geometry',
    stylers: [
      {
        color: '#e5e5e5',
      },
    ],
  },
  {
    featureType: 'transit.station',
    elementType: 'geometry',
    stylers: [
      {
        color: '#F4F4F5',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      {
        color: '#D6D3D1',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#A3A3A3',
      },
    ],
  },
];
function SuperAdminMarkersMap({ markers, zoom }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<google.maps.Marker>();
  useEffect(() => {
    loader.load().then(async (e) => {
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
          styles: googleMapsStyles,
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
  }, [markers, zoom]);

  return (
    <div
      ref={mapRef}
      style={{ height: '100%', width: '100%', borderRadius: '0.5rem' }}
    />
  );
}

export default SuperAdminMarkersMap;
