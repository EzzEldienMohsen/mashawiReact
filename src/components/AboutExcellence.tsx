import React from 'react';
import { excellence } from '../assets';
import { SectionTitle } from '../subComponents';
import { useTranslation } from 'react-i18next';

const AboutExcellence: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className=" flex flex-col justify-center items-center 2xl:gap-y-10 my-12 lg:px-[220px]">
      <SectionTitle title={t('aboutExcellenceSectionTitle')} />
      <div className="flex flex-col justify-start items-start gap-y-6 2xl:gap-y-[170px] lg:flex-row lg:justify-evenly lg:items-center w-full lg:flex-wrap">
        {excellence.map((card) => {
          return (
            <div
              key={card.id}
              className="flex justify-start items-start gap-x-10 w-full lg:w-[44%]"
            >
              <img
                src={card.src}
                alt="alt"
                className="h-32 w-20 md:h-24 lg:w-24  lg:h-32 2xl:w-36 2xl:h-40"
              />
              <div className="flex flex-col justify-between items-start gap-y-5 font-abdo">
                <h1 className="font-bold text-md md:text-lg 2xl:text-3xl">
                  {t(card.title)}
                </h1>
                <p className="text-xs md:text-sm lg:text-sm 2xl:text-xl font-abdo">
                  {t(card.text)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AboutExcellence;
