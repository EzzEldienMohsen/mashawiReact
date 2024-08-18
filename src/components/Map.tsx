import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { AddressResponse } from '../assets/types';
import { useGlobalContext } from '../context/GlobalContext';

const Map: React.FC = () => {
  const axiosData: any = useLoaderData();
  const { theMap } = useGlobalContext();
  const data: AddressResponse = axiosData.data;
  const unSortedItems = data.data;
  const sortedItems = unSortedItems.sort((a, b) => a.order - b.order);

  return (
    <div className="w-full my-8 py-4 px-8 lg:px-20 bg-transparent flex justify-center items-center">
      <iframe
        title="Google Map"
        src={theMap.length > 0 ? theMap : sortedItems[0].location}
        className="w-3/5 h-48 md:h-96"
        style={{ border: 0 }}
        allowFullScreen={false}
        loading="lazy"
      ></iframe>
    </div>
  );
};
export default Map;
