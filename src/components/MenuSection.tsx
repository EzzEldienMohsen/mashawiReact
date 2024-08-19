import React from 'react';
import { Link } from 'react-router-dom';
import img from '../assets/MenuSectionLanding.png';
import { useTranslation } from 'react-i18next';

const MenuSection: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col justify-center items-center py-20 lg:flex-row lg:justify-between bg-[#F8F8F8] lg:items-between gap-y-10 lg:gap-y-0  w-full px-8 lg:px-20">
      <img src={img} alt="pic" className="w-4/5 lg:w-2/5" />
      <div className="flex flex-col text-center lg:text-start justify-center items-center  lg:justify-start gap-y-4 lg:items-start w-full lg:w-1/2">
        <h1 className="text-2xl md:text-3xl mb-6 font-bold">
          {t('mainMenuSectionText1')}
        </h1>
        <p className="text-xs md:text-lg lg:text-xl font-medium">
          {t('mainMenuSectionText2')}
        </p>
        <p className="text-xs md:text-lg lg:text-xl mb-6 font-medium">
          {t('mainMenuSectionText3')}
        </p>
        <Link to="/meals">
          <button className="btn text-white hover:bg-newRed hover:text-white px-16 py-2 text-center text-sm  md:text-xl rounded-3xl bg-newRed my-2">
            {t('browseMenu')}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MenuSection;
