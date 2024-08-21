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
      className={`my-2 w-4/5 pb-3  md:w-[44%] lg:w-[24%] 2xl:w-[22] ${
        isLangArabic
          ? 'rounded-tr-3xl rounded-bl-3xl'
          : 'rounded-tl-3xl rounded-br-3xl'
      } bg-white pb-5 flex flex-col justify-center items-center gap-y-4 2xl:gap-y-8`}
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
      <div className="flex justify-evenly gap-x-2 2xl:gap-x-4 items-center">
        <img src={dateIcon} alt="date" />
        <p className="font-abdo text-sm md:text-xs font-light 2xl:text-xl">
          {formattedDate}
        </p>
      </div>
      <h1 className="font-abdo text-md md:text-sm font-semibold 2xl:text-3xl">
        {data.title}
      </h1>
      <Link
        to={
          destination !== 'singleArticle'
            ? `/${destination}/${data.id}`
            : `/${destination}`
        }
        className="btn w-4/5 bg-newRed text-white font-abdo font-normal rounded-full 2xl:text-2xl 2xl:py-2 2xl:min-h-[40px] 2xl:h-auto 2xl:flex 2xl:justify-center 2xl:items-center"
      >
        {t('eventsButton')}
      </Link>
    </div>
  );
};

export default EventsCard;
