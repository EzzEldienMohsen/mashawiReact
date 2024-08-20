import React from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import slogan from '../assets/svg/mainHero/slogan.svg';
import grass from '../assets/svg/mainHero/grass.svg';
import onion from '../assets/svg/mainHero/onion.svg';
import theImage from '../assets/صورة الرئيسية.png';

import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const MainHero: React.FC = () => {
  const { isLangArabic } = useGlobalContext();
  const { t } = useTranslation();
  return (
    <div className="w-full relative pb-24  px-8 lg:px-20 ">
      {/* the Colored Div */}
      <div
        className={`absolute w-full  z-10 lg:w-[30%] background-gradient h-1/4 md:h-1/3 lg:h-full top-0 ${
          isLangArabic ? 'left-0' : 'right-0'
        } `}
      ></div>
      <div className="flex mt-10 w-full lg:mt-[80px] flex-col justify-center items-start lg:flex-row-reverse lg:justify-between lg:items-center">
        {/* The image */}
        <div className="relative w-4/5 md:w-1/2 lg:w-[36%] aspect-square md:aspect-[4/3] lg:aspect-square place-self-center">
          <img
            src={theImage}
            alt="mashawi"
            className="z-20 rounded-full absolute inset-0"
          />
          <img
            src={theImage}
            alt="mashawi"
            className=" rounded-full border-[1px] absolute inset-0 border-newRed p-[1px] border-gradient"
          />
        </div>
        {/* Content */}
        <div className="flex flex-col mt-4 lg:mt-12 lg:w-[45%] justify-start items-start gap-y-8 lg:pb-20 relative">
          <img
            src={onion}
            alt="leaf"
            className={`absolute w-28 md:w-48 aspect-square text-sm top-1/2 lg:top-[100%] ${
              isLangArabic
                ? 'left-[20%] md:left-0 lg:left-[82%] '
                : '-right-1/3 md:-right-1/2 transform scale-x-[-1] lg:right-[30%]  '
            } transform -translate-x-1/2 -translate-y-1/2  `}
          />
          <img src={slogan} alt="slogan" />
          <h1 className="text-black font-bold font-abdo relative text-xl md:tex-2xl lg:text-3xl">
            {t('MainHeroBigTitle')}
            <img
              src={grass}
              alt="leaf"
              className={`absolute top-1/2 ${
                isLangArabic ? 'left-0' : '-right-1/2 transform scale-x-[-1]'
              } transform -translate-x-1/2 -translate-y-1/2 mb-4 w-1/2 md:w-3/5`}
            />
          </h1>
          <h1 className="font-bold font-abdo text-newRed text-xl md:tex-2xl lg:text-3xl">
            {t('MainHeroSecondTitle')}
          </h1>
          <p className="font-abdo text-black text-sm md:text-lg w-4/5 lg:w-full lg:text-xl">
            {t('MainHeroText')}
          </p>
          <Link
            to="/meals"
            className="text-white bg-newRed btn px-6 w-1/2 py-4 rounded-full"
          >
            {t('MainHeroOrder')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainHero;
