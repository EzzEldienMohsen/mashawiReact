import React from 'react';
import { StaticRequestData } from '../assets/types';

interface PolicyProps {
  title: string;
  data: StaticRequestData;
}
const Policy: React.FC<PolicyProps> = ({ title, data }) => {
  return (
    <>
      <div className="bg-[#2C2220] flex flex-col text-start  justify-start items-center py-6 my-6 font-abdo">
        <h1 className="mb-4  text-xl md:text-xl lg:text-2xl text-start font-bold text-newRed">
          {title}
        </h1>
      </div>
      <ul className="list-none text-start w-full px-8 lg:px-20   mb-6">
        <p
          className="my-4 text-sm md:text-md lg:text-md font-normal text-start"
          dangerouslySetInnerHTML={{ __html: data.data }}
        />
      </ul>
    </>
  );
};

export default Policy;
