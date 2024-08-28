import React from 'react';
import { EventsResponse } from '../assets/types';
import { autoFetch } from '../utils';
import { QueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { EventsCard } from '../components';
import { useLoaderData } from 'react-router-dom';
// const eventsQuery = (language: string): EventsQuery => {
//   return {
//     queryKey: ['blogs', language],
//     queryFn: () =>
//       autoFetch('blogs', {
//         headers: {
//           lang: language,
//         },
//       }),
//   };
// };
// export const loader =
//   (queryClient: QueryClient, language: string) =>
//   async (): Promise<EventsResponse> => {
//     const data = await queryClient.ensureQueryData(eventsQuery(language));
//     return data;
//   };

export const loader =
  (queryClient: QueryClient, language: string) =>
  async (): Promise<EventsResponse> => {
    return await queryClient.ensureQueryData({
      queryKey: ['blogs', language],
      queryFn: () => autoFetch('blogs', { headers: { lang: language } }),
    });
  };

const Articles: React.FC = () => {
  const { t } = useTranslation();
  const axiosData: any = useLoaderData();
  const data: EventsResponse = axiosData.data;
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  if (!data) {
    return (
      <div className="flex w-full py-8 justify-center items-center">
        <span className="loading loading-spinner loading-lg text-newRed"></span>
      </div>
    );
  }
  return (
    <div className="flex flex-col justify-center items-center w-full my-4  py-8">
      <div className="bg-[#2C2220] flex flex-col text-start  w-full justify-start items-center px-4 py-6 my-6 font-abdo">
        <h1 className="mb-4  text-xl md:text-3xl  lg:text-5xl text-start font-bold text-newRed">
          {t('articlesRoute')}
        </h1>
      </div>
      <div className="w-full flex flex-col justify-center items-center gap-y-4 px-8 lg:px-[220px]">
        <div className="my-8 flex flex-col  justify-center items-center gap-y-5 md:flex md:flex-row md:gap-x-2 lg:justify-start md:flex-wrap w-full">
          {data.data.map((data) => {
            return (
              <EventsCard
                key={data.id}
                data={data}
                destination="singleArticle"
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Articles;
