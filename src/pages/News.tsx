import React from 'react';
import { useTranslation } from 'react-i18next';
import { events } from '../assets';
import { EventsCard } from '../components';

const News:React.FC = () => {
      const { t } = useTranslation();

  return (
    <div className="flex flex-col justify-center items-center w-full my-4  py-8">
      <div className="bg-[#2C2220] flex flex-col text-start  w-full justify-start items-center px-4 py-6 my-6 font-abdo">
        <h1 className="mb-4  text-xl md:text-xl lg:text-2xl text-start font-bold text-newRed">
          {t('newsRoute')}
        </h1>
      </div>
      <div className="w-full flex flex-col justify-center items-center gap-y-4 px-8 lg:px-20">
        <div className="my-8 flex flex-col  justify-center items-center gap-y-5 md:flex-row md:grid md:grid-cols-2 lg:flex lg:flex-row lg:justify-between lg:flex-wrap w-full">
          {events.map((data) => {
            return <EventsCard key={data.id} data={data} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default News