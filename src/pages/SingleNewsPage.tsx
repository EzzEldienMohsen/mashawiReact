import React from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import { SingleEventQuery, SingleEventResponse } from '../assets/types';
import { autoFetch } from '../utils';
import { QueryClient } from '@tanstack/react-query';
import { Params, useLoaderData } from 'react-router-dom';
import dateIcon from '../assets/svg/events/dateIcon.svg';

const SingleNewsQuery = (
  token: string,
  language: string,
  id: string | undefined
): SingleEventQuery => {
  return {
    queryKey: ['singleNews', token, language, id],
    queryFn: () =>
      autoFetch(`news/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          lang: language,
        },
      }),
  };
};

export const loader =
  (queryClient: QueryClient, token: string, language: string) =>
  async ({
    params,
  }: {
    params: Params<string>;
  }): Promise<SingleEventResponse> => {
    const { id } = params;
    const data = await queryClient.ensureQueryData(
      SingleNewsQuery(token, language, id)
    );
    return data;
  };
const SingleNewsPage: React.FC = () => {
  const { isLangArabic } = useGlobalContext();
  const axiosData: any = useLoaderData();
  const data: SingleEventResponse = axiosData.data;
  console.log(data);
  return (
    <div className="flex flex-col justify-start items-start relative gap-y-6 py-4 w-full">
      <div className="absolute top-0 left-0 w-full py-10 md:py-20 bg-[#2C2220] "></div>
      <div className={`w-full flex justify-center items-center `}>
        <img
          src={data.data.image}
          alt="image"
          className={`w-4/5 aspect-[6/2] z-10 ${
            isLangArabic
              ? 'rounded-tr-3xl rounded-bl-3xl'
              : 'rounded-tl-3xl rounded-br-3xl'
          }`}
        />
      </div>
      <div className="w-full flex-col flex justify-start items-start px-8 lg:px-20 gap-y-6">
        <div className=" flex   justify-start gap-x-6 items-center">
          <img src={dateIcon} alt="date" />
          <p className="font-abdo text-md md:text-lg font-light">
            {data.data.date}
          </p>
        </div>
        <h1 className="font-abdo text-lg md:text-2xl font-bold">
          {data.data.title}
        </h1>
        <p
          className="font-abdo text-lg md:text-xl font-medium"
          dangerouslySetInnerHTML={{ __html: data.data.content }}
        />
      </div>
    </div>
  );
};

export default SingleNewsPage;
