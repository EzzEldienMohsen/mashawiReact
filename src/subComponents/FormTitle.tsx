import React from 'react';
import leaf from '../assets/svg/leaf.svg';

const FormTitle:React.FC<{title:string}> = ({ title }) => {
  return (
    <div className="relative my-24 flex justify-center items-center md:w-full lg:w-4/5">
      <h1 className="relative text-black font-bold text-2xl md:text-3xl lg:text-2xl z-10">
        {title}
      </h1>
      <img
        src={leaf}
        alt="leaf"
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  );
};

export default FormTitle;