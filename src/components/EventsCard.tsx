import React from 'react';
import { EventData } from '../assets/types';
import { useGlobalContext } from '../context/GlobalContext';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import dateIcon from '../assets/svg/events/dateIcon.svg';

const EventsCard: React.FC<{ data: EventData }> = ({ data }) => {
  const { isLangArabic } = useGlobalContext();
  const { t } = useTranslation();
  return (
    <div
      className={`my-2 w-3/4 pb-3 md:w-[90%] lg:w-[22%] ${
        isLangArabic
          ? 'rounded-tr-3xl rounded-bl-3xl'
          : 'rounded-tl-3xl rounded-br-3xl'
      } bg-white flex flex-col justify-center items-center gap-y-4 `}
    >
      <img
        src={data.image}
        alt="img"
        className={`w-full  ${
          isLangArabic
            ? 'rounded-tr-3xl rounded-bl-3xl'
            : 'rounded-tl-3xl rounded-br-3xl'
        }`}
      />
      <div className="w-3/5 flex justify-evenly items-center">
        <img src={dateIcon} alt="date" />
        <p className="font-abdo text-sm md:text-xs font-light">
          {t(data.date)}
        </p>
      </div>
      <h1 className="font-abdo text-md md:text-sm font-semibold">
        {t(data.title)}
      </h1>
      <Link
        to="/singleEvent"
        className="btn w-4/5 bg-newRed text-white font-abdo font-normal rounded-full"
      >
        {t('eventsButton')}
      </Link>
    </div>
  );
};

export default EventsCard;
