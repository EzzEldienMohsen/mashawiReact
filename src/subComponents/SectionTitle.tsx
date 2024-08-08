import React from 'react';
import leaf from '../assets/svg/leaf.svg';
import { useGlobalContext } from '../context/GlobalContext';

const SectionTitle: React.FC<{ title: string }> = ({ title }) => {
  const { isLangArabic } = useGlobalContext();
  return (
    <h1 className="text-black  my-16 relative font-bold text-2xl md:text-3xl lg:text-2xl tracking-wide">
      {title}
      <img
        src={leaf}
        alt="leaf"
        className={`absolute top-1/2 ${
          isLangArabic ? 'left-0' : '-right-1/2 transform scale-x-[-1]'
        } transform -translate-x-1/2 -translate-y-1/2 mb-4 w-1/2 md:w-3/5`}
      />
    </h1>
  );
};

export default SectionTitle;
