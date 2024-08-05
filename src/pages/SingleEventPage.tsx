import React from 'react'
import { singleEvent } from '../assets';
import { useTranslation } from 'react-i18next';
import { useGlobalContext } from '../context/GlobalContext';

const SingleEventPage:React.FC = () => {
       const { isLangArabic } = useGlobalContext();
       const { t } = useTranslation();
   
  return (
    <div className="flex flex-col justify-start items-start relative gap-y-6 py-4 w-full">
      <div className="absolute top-0 left-0 w-full py-10 md:py-20 bg-[#2C2220] "></div>
      <div
        className={`w-full flex justify-center items-center `}
      >
        <img
          src={singleEvent.img}
          alt="image"
          className={`w-4/5 z-10 ${
            isLangArabic
              ? 'rounded-tr-3xl rounded-bl-3xl'
              : 'rounded-tl-3xl rounded-br-3xl'
          }`}
        />
      </div>
      <div className="w-full flex-col flex justify-start items-start px-8 lg:px-20 gap-y-6">
        <div className=" flex   justify-start gap-x-6 items-center">
          <img src={singleEvent.icon} alt="date" />
          <p className="font-abdo text-md md:text-lg font-light">
            {t(singleEvent.timeText)}
          </p>
        </div>
        <h1 className="font-abdo text-lg md:text-2xl font-bold">
          {t(singleEvent.title)}
        </h1>
        <p className="font-abdo text-lg md:text-xl font-medium">
          {t(singleEvent.text)}
        </p>
      </div>
    </div>
  );
}

export default SingleEventPage