import React from 'react';

import { useTranslation } from 'react-i18next';
import { menuCategories } from '../assets';

const Slider:React.FC = () => {
 
  const { t } = useTranslation();

  return (
    <div className="carousel rounded-box flex overflow-x-auto space-x-4 py-4">
      {menuCategories.map((category, index) => (
        <div
          key={index}
          className="carousel-item flex-shrink-0 w-14 h-14 md:w-24 md:h-24 lg:w-32 lg:h-32 bg-transparent rounded-2xl shadow-md flex flex-col items-center justify-center mx-1"
        >
          <img
            src={category.icon}
            alt={category.label}
            className="w-5 h-5 md:w-10 md:h-10 lg:w-12 lg:h-12 mb-1 md:mb-2"
          />
          <span className="text-newRed text-[10px] md:text-sm lg:text-base">
            {t(category.label)}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Slider;
