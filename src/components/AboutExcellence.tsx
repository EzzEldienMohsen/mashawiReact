import React from 'react';
import { excellence } from '../assets';
import { SectionTitle } from '../subComponents';
import { useTranslation } from 'react-i18next';

const AboutExcellence:React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className=" flex flex-col justify-center items-center my-12 px-8 lg:px-20">
      <SectionTitle title={t('aboutExcellenceSectionTitle')} />
      <div className="flex flex-col justify-start items-start gap-y-6 lg:flex-row lg:justify-evenly lg:items-center w-full lg:flex-wrap">
        {excellence.map((card)=>{
          return <div key={card.id} className='flex justify-start items-start gap-x-3 w-full lg:w-[40%]' >
            <img src={card.src} alt="alt" className='h-32 w-20 md:h-24 lg:w-24  lg:h-36'/>
            <div className='flex flex-col justify-between items-start gap-y-5 font-abdo'>
                 <h1 className="font-bold text-md md:text-xl ">
                  {t(card.title)}
                </h1>
                <p className="text-xs md:text-sm lg:text-sm">{t(card.text)}</p>
            </div>
          </div>
        })}
      </div>
    </div>
  );
};

export default AboutExcellence;
