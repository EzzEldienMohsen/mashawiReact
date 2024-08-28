import React from 'react';
import { Link } from 'react-router-dom';
import img from '../assets/MenuSectionLanding.png';
import { useTranslation } from 'react-i18next';

const MenuSection: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col justify-center items-center py-10 lg:flex-row-reverse lg:justify-between bg-[#F8F8F8] lg:items-between gap-y-10 lg:gap-y-0  w-full px-8 lg:px-[220px]">
      <div className="flex flex-col text-center lg:text-start justify-center items-center  lg:justify-start gap-y-2 2xl:gap-y-5 lg:items-start w-full lg:w-1/2">
        <h1 className="text-xl md:text-3xl 2xl:text-[40px] mb-6 font-extrabold">
          {t('mainMenuSectionText1')}
        </h1>
        <p className="text-xs md:text-lg lg:text-xl  font-medium">
          {t('mainMenuSectionText2')}
        </p>

        <Link
          to="/meals"
          className="btn text-white hover:bg-newRed font-abdo hover:text-white px-16 py-2 text-center text-lg   lg:text-xl rounded-full bg-newRed my-2 min-h-12 lg:min-h-[56px] h-auto"
        >
          {t('browseMenu')}
        </Link>
      </div>
      <img src={img} alt="pic" className="w-4/5 lg:w-2/5" />
    </div>
  );
};

export default MenuSection;
