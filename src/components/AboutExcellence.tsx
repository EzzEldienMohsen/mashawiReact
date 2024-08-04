import React from 'react';
import { excellence } from '../assets';
import { SectionTitle } from '../subComponents';
import { useTranslation } from 'react-i18next';

const AboutExcellence:React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className=" flex flex-col justify-center items-center my-12 px-8 lg:px-20">
      <SectionTitle title={t('aboutExcellenceSectionTitle')} />
      <div className="flex flex-col w-full gap-y-8 justify-start items-start mt-8 lg:grid lg:grid-cols-2 lg:gap-x-14 lg:gap-y-6 mb-2 ">
        {excellence.map((card) => {
          return (
            <div
              key={card.id}
              className="flex gap-x-4  flex-row items-start   lg:justify-start text-start lg:items-start w-full"
            >
              <img
                src={card.src}
                alt="img"
                className="w-24 md:w-16 mb-2 lg:w-auto md:mb-0 "
              />
              <div className="flex flex-col justify-start lg:mt-2 gap-y-4 md:gap-y-3 lg:gap-y-4  items-start ">
                <h1 className="font-bold text-md md:text-xl lg:text-2xl">
                  {t(card.title)}
                </h1>
                <p className="text-xs md:text-sm lg:text-md">{t(card.text)}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AboutExcellence;
