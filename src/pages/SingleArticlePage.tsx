import React from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import { SingleEventQuery, SingleEventResponse } from '../assets/types';
import { autoFetch } from '../utils';
import { QueryClient } from '@tanstack/react-query';
import { Params } from 'react-router-dom';
import dateIcon from '../assets/svg/events/dateIcon.svg';
import theImage from '../assets/svg/singleArticle/Image.svg';

import dayjs from 'dayjs';
import 'dayjs/locale/ar';
import 'dayjs/locale/en';
import { useTranslation } from 'react-i18next';
import { singleEvent } from '../assets';
const singleEventQuery = (
  language: string,
  id: string | undefined
): SingleEventQuery => {
  return {
    queryKey: ['singleEvent', language, id],
    queryFn: () =>
      autoFetch(`events/${id}`, {
        headers: {
          lang: language,
        },
      }),
  };
};

export const loader =
  (queryClient: QueryClient, language: string) =>
  async ({
    params,
  }: {
    params: Params<string>;
  }): Promise<SingleEventResponse> => {
    const { id } = params;
    const data = await queryClient.ensureQueryData(
      singleEventQuery(language, id)
    );
    return data;
  };
const SingleArticlePage: React.FC = () => {
  const { isLangArabic } = useGlobalContext();
  //   const axiosData: any = useLoaderData();
  //   const data: SingleEventResponse = axiosData.data;
  const locale = isLangArabic ? 'ar' : 'en';
  dayjs.locale(locale);
  const { t } = useTranslation();
  const formattedDate = dayjs(singleEvent.timeText)
    .locale(locale)
    .format('DD MMM YYYY');
  return (
    <div className="flex flex-col justify-start items-start relative gap-y-6 2xl:gap-y-10 py-4 w-full">
      <div className="absolute top-0 left-0 w-full py-10 md:py-20 2xl:py-28 bg-[#2C2220] "></div>
      <div className={`w-full flex justify-center items-center `}>
        {/* the group parent */}
        <div
          className={`w-4/5 aspect-[4/3] md:aspect-[6/2] px-2 py-4 lg:p-2 2xl:aspect-[6/1] flex relative flex-col gap-y-6 lg:flex-row-reverse lg:items-center lg:justify-evenly bg-white  2xl:w-4/5 z-10 ${
            isLangArabic
              ? 'rounded-tr-3xl rounded-bl-3xl'
              : 'rounded-tl-3xl rounded-br-3xl'
          }`}
        >
          {/* the Colored Div */}
          <div
            className={`absolute w-full  z-10 lg:w-[30%] 2xl:w-[25%] background-gradient h-1/5 md:h-2/5 lg:h-full  top-0 ${
              isLangArabic
                ? 'left-0 rounded-tr-3xl lg:rounded-tr-none lg:rounded-bl-3xl'
                : 'right-0 rounded-tl-3xl'
            } `}
          ></div>
          {/* The image */}
          <div className="relative  w-2/5 lg:w-[30%] 2xl:w-[20%] aspect-square  lg:aspect-square place-self-center">
            <img
              src={theImage}
              alt="mashawi"
              className="z-30 rounded-full absolute inset-0 2xl:inset-auto"
            />
            <img
              src={theImage}
              alt="mashawi"
              className=" rounded-full border-[1px] absolute inset-0 2xl:inset-auto border-newRed p-[1px] border-gradient"
            />
          </div>
          {/* Content */}
          <div className="flex flex-col w-full lg:w-[45%] 2xl:w-[50%] justify-start items-start gap-y-2 lg:gap-y-8 ">
            <div className="flex justify-center items-center gap-x-1">
              <h1 className="text-black font-bold font-abdo  text-sm md:tex-3xl lg:text-2xl 2xl:text-5xl">
                {t('MainHeroBigTitle')}
              </h1>
              <h1 className="font-bold font-abdo text-newRed text-sm md:tex-3xl lg:text-2xl 2xl:text-5xl">
                {t('MainHeroSecondTitle')}
              </h1>
            </div>
            <p className="font-abdo text-black text-xs font-light md:text-lg w-4/5 lg:w-full lg:text-xl 2xl:text-3xl">
              {t('singleArticleHeroText')}
            </p>
          </div>
        </div>
      </div>
      {/* The rest of the page */}
      <div className="w-full flex-col flex justify-start items-start px-8 lg:px-20 gap-y-6 2xl:gap-y-10">
        <div className="flex justify-start gap-x-6 2xl:gap-x-10 items-center">
          <img src={dateIcon} alt="date" className="2xl:w-10 2xl:h-10" />
          <p className="font-abdo text-md md:text-lg lg:text-xl font-light 2xl:text-3xl">
            {formattedDate}
          </p>
        </div>
        <h1 className="font-abdo text-lg md:text-2xl font-bold 2xl:text-5xl">
          {t(singleEvent.title)}
        </h1>
        {/* <p
          className="font-abdo text-lg md:text-xl font-medium 2xl:text-4xl"
          dangerouslySetInnerHTML={{ __html: data.data.content }}
        /> */}
        <p className="font-abdo text-lg md:text-xl font-medium 2xl:text-4xl">
          {' '}
          {t(singleEvent.text)}
        </p>
      </div>
    </div>
  );
};

export default SingleArticlePage;
