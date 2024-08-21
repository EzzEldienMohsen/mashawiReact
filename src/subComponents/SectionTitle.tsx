import React from 'react';
import leaf from '../assets/svg/leaf.svg';
import { useGlobalContext } from '../context/GlobalContext';

const SectionTitle: React.FC<{ title: string }> = ({ title }) => {
  const { isLangArabic } = useGlobalContext();
  return (
    <div className="my-16 relative flex justify-center items-center">
      <h1 className="text-black font-bold text-2xl md:text-3xl lg:text-2xl 2xl:text-4xl tracking-wide">
        {title}
      </h1>
      <img
        src={leaf}
        alt="leaf"
        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
          isLangArabic ? 'left-1/2' : '-right-1/2 transform scale-x-[-1]'
        }  mb-4 w-1/2 md:w-3/5 2xl:w-full`}
      />
    </div>
  );
};

export default SectionTitle;
