import React from 'react';
import leaf from '../assets/svg/leaf.svg';

const SectionTitle:React.FC<{title:string}> = ({ title }) => {
  return (
    <h1 className="text-black  my-16 relative font-bold text-2xl md:text-3xl lg:text-2xl tracking-wide">
      {title}
      <img
        src={leaf}
        alt="leaf"
        className="absolute top-1/2 left-0 transform -translate-x-1/2 -translate-y-1/2 mb-4 w-1/2 md:w-3/5"
      />
    </h1>
  );
};

export default SectionTitle;
