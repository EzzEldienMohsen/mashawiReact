import React from 'react';
import { EventData } from '../assets/types';
import { useGlobalContext } from '../context/GlobalContext';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import dateIcon from '../assets/svg/events/dateIcon.svg';
import dayjs from 'dayjs';
import 'dayjs/locale/ar';
import 'dayjs/locale/en';

const EventsCard: React.FC<{ data: EventData; destination: string }> = ({
  data,
  destination,
}) => {
  const { isLangArabic } = useGlobalContext();
  const { t } = useTranslation();
  const locale = isLangArabic ? 'ar' : 'en';
  dayjs.locale(locale);

  const formattedDate = dayjs(data.date).locale(locale).format('DD MMM YYYY');
  return (
    <div
      className={`my-2 w-4/5 pb-3  md:w-[44%] lg:w-[24%] ${
        isLangArabic
          ? 'rounded-tr-3xl rounded-bl-3xl'
          : 'rounded-tl-3xl rounded-br-3xl'
      } bg-white pb-5 flex flex-col justify-center items-center gap-y-4 `}
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
      <div className="flex justify-evenly gap-x-2 items-center">
        <img src={dateIcon} alt="date" />
        <p className="font-abdo text-sm md:text-xs font-light">
          {formattedDate}
        </p>
      </div>
      <h1 className="font-abdo text-md md:text-sm font-semibold">
        {data.title}
      </h1>
      <Link
        to={`/${destination}/${data.id}`}
        className="btn w-4/5 bg-newRed text-white font-abdo font-normal rounded-full"
      >
        {t('eventsButton')}
      </Link>
    </div>
  );
};

export default EventsCard;
