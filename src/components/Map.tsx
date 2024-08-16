import React, { useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AddressResponse } from '../assets/types';
import { useGlobalContext } from '../context/GlobalContext';

const Map: React.FC = () => {
  const axiosData: any = useLoaderData();
  const { theMap } = useGlobalContext();
  const data: AddressResponse = axiosData.data;
  const unSortedItems = data.data;
  const sortedItems = unSortedItems.sort((a, b) => a.order - b.order);
  console.log(sortedItems);
  const locationUrl =
    'https://www.google.com/maps/@30.0188692,31.2511902,14z?entry=ttu';
  // const locationUrl = theMap.length > 0 ? theMap : sortedItems[0].location;

  // Extract latitude and longitude from the URL using a regular expression
  const locationMatch = locationUrl.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
  const latitude = locationMatch ? parseFloat(locationMatch[1]) : 0;
  const longitude = locationMatch ? parseFloat(locationMatch[2]) : 0;
  const center = {
    lat: latitude,
    lng: longitude,
  };

  // Function to dynamically load Google Maps script
  const loadGoogleMapsScript = (callback: () => void) => {
    const existingScript = document.getElementById('googleMaps');
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${
        import.meta.env.VITE_GOOGLE_MAPS_API_KEY
      }&callback=initMap`;
      script.id = 'googleMaps';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      script.onload = () => {
        if (callback) callback();
      };
    } else {
      if (callback) callback();
    }
  };

  useEffect(() => {
    const initMap = () => {
      if (latitude && longitude && window.google) {
        // Create map instance
        const map = new window.google.maps.Map(
          document.getElementById('map') as HTMLElement,
          {
            center,
            zoom: 10,
          }
        );

        // Create marker instance
        new window.google.maps.Marker({
          position: center,
          map,
        });
      }
    };

    // Load the Google Maps script and initialize the map once loaded
    loadGoogleMapsScript(initMap);
  }, [latitude, longitude, theMap]);

  return (
    <div className="w-full my-8 py-4 px-8 lg:px-20  bg-transparent flex justify-center items-center">
      <div id="map" className="w-4/5 aspect-[5/3]"></div>
    </div>
  );
};

export default Map;
