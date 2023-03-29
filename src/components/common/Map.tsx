import { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

type Props = {
  center: google.maps.LatLngLiteral;
  zoom: number;
};

const loader = new Loader({
  apiKey: 'AIzaSyCQ_g14OfzLkLOD6MGp4iJPuau2mbnjwvw',
  version: 'weekly',
});

function Map({ center, zoom }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();
  const markerRef = useRef<google.maps.Marker>();

  useEffect(() => {
    loader.load().then(async (e) => {
      const options: google.maps.MapOptions = {
        center,
        zoom,
        mapTypeId: 'roadmap',
        mapTypeControl: false,
      };
      const map = new google.maps.Map(mapRef.current!, options);
      setMap(map);
      const marker = new google.maps.Marker({
        position: center,
        map,
        title: 'Location',
        icon: {
          path: 'M13.484 22.852c-0.618-0.382-0.891-1.13-0.686-1.813 0.26-0.803 1.063-1.352 1.943-1.352h4.527c0.88 0 1.682 0.549 1.942 1.352 0.205 0.683-0.068 1.431-0.687 1.813l-3.682 2.29c-0.613 0.382-1.34 0.382-1.953 0.001l-3.682-2.289zM19.294 10.284c-1.129 0-2.044-0.915-2.044-2.044s0.915-2.044 2.044-2.044 2.044 0.915 2.044 2.044c0 1.128-0.915 2.044-2.044 2.044zM19.294 4.196c-1.692 0-3.072 1.379-3.072 3.072s1.379 3.072 3.072 3.072 3.072-1.379 3.072-3.072-1.38-3.072-3.072-3.072z',
          fillColor: '#1D1D1D',
          fillOpacity: 1,
          strokeWeight: 1,
          scale: 3,
        },
      });
      markerRef.current = marker;
    });
  }, [center, zoom]);

  return <div ref={mapRef} style={{ height: '100%', width: '100%' }} />;
}

export default Map;
