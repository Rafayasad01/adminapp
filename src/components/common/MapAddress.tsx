import { Loader } from '@googlemaps/js-api-loader';
import { useEffect, useRef, useState } from 'react';
import assets from '../../assets';

type Props = {
  getValues?: any;
  setValue?: any;
  address: string;
  zoom: number;
};

const loader = new Loader({
  apiKey: 'AIzaSyBp7k8-SYDkEkhcGbXQ9f_fAXPXmwmlvUQ',
  version: 'weekly',
});

function MapAddress({ address, zoom, setValue, getValues }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();
  // const [marker, setMarker] = useState<google.maps.Marker>();
  const [isError, setIsError] = useState<boolean>(false);

  const center: google.maps.LatLngLiteral = {
    lat: 0,
    lng: 0,
  };

  useEffect(() => {
    loader.load().then(async () => {
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
      if (mapRef.current) {
        const mapInstance = new google.maps.Map(mapRef.current, options);
        setMap(mapInstance);
      }
    });
  }, []); // loader ki state change ni hogi tou wo useeffect py koi asar ni karyga

  useEffect(() => {
    if (map && address) {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address }, (results, status: any) => {
        if (status === 'OK' && status !== 'ZERO_RESULTS') {
          setIsError(false);
          const { location } = results[0].geometry;
          if (location && location.lat() && location.lng()) {
            new google.maps.Marker({
              position: location,
              map,
              title: address,
              icon: assets.images.iconMap,
              draggable: false,
              animation: google.maps.Animation.DROP,
            });
            // setMarker(newMarker);
            map.setCenter(location);
            console.log('gettt', getValues('latitude'));

            if (getValues('latitude') === 0 || getValues('longitude') === 0) {
              setValue('latitude', location.lat());
              setValue('longitude', location.lng());
            }
          } else {
            setIsError(true);
            // console.error('Invalid geocoder response for address:', address);
          }
        } else {
          setIsError(true);
          // console.error('Geocode was not successful for the following reason:', status);
        }
      });
    }
  }, [map, address]);

  return (
    <>
      <div
        style={{
          display: isError ? 'block' : 'none',
          width: '100%',
          height: '100%',
        }}
      >
        <div className="no-map-location">
          <div className="content">
            <div className="icon">
              <img className="w-100" src={assets.images.noMapLocation} alt="" />
            </div>
            <h4 className="text">Location not available</h4>
          </div>
        </div>
      </div>

      <div
        ref={mapRef}
        style={{
          height: '100%',
          width: '100%',
          borderRadius: '0.5rem',
          display: isError ? 'none' : 'block',
        }}
      />
    </>
  );
}

export default MapAddress;
