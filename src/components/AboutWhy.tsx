import React from 'react';
import { whyArray } from '../assets';
import { useTranslation } from 'react-i18next';
import whyImg from '../assets/Image.png';

const AboutWhy: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col lg:flex-row-reverse justify-center items-center w-full lg:bg-white lg:justify-between">
      <img
        src={whyImg}
        alt="alt"
        className="w-full lg:w-1/2 md:h-1/4 lg:h-auto"
      />
      <div className="font-abdo flex flex-col justify-center items-center gap-y-6 px-8 lg:px-20 py-4 w-full lg:w-1/2">
        <h1 className="text-black font-bold font-abdo text-2xl lg:text-3xl">
          {t('aboutWhySectionTitle')}
        </h1>
        <ul className="w-full flex flex-col items-start justify-center gap-y-4">
          {whyArray.map((why) => (
            <li
              key={why.id}
              className="flex flex-row items-start justify-start gap-x-4 lg:gap-x-6 w-full"
            >
              <img src={why.src} alt="logo" className="w-8 " />
              <div className="flex flex-col gap-y-1">
                <p className="font-semibold text-black text-sm md:text-md lg:text-lg">
                  {t(why.title)}
                </p>
                <p className="text-black text-xs md:text-sm lg:text-md">
                  {t(why.text)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AboutWhy;
