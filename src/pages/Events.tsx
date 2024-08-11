import React from 'react';
import { useTranslation } from 'react-i18next';
import { EventsCard } from '../components';
import { EventsQuery, EventsResponse } from '../assets/types';
import { autoFetch } from '../utils';
import { QueryClient } from '@tanstack/react-query';
import { useLoaderData } from 'react-router-dom';
const eventsQuery = (language: string): EventsQuery => {
  return {
    queryKey: ['events', language],
    queryFn: () =>
      autoFetch('events?limit=12', {
        headers: {
          lang: language,
        },
      }),
  };
};
export const loader =
  (queryClient: QueryClient, language: string) =>
  async (): Promise<EventsResponse> => {
    const data = await queryClient.ensureQueryData(eventsQuery(language));
    return data;
  };

const Events: React.FC = () => {
  const axiosData: any = useLoaderData();
  const data: EventsResponse = axiosData.data;
  console.log(data);
  const { t } = useTranslation();
  return (
    <div className="flex flex-col justify-center items-center w-full my-4  py-8">
      <div className="bg-[#2C2220] flex flex-col text-start  w-full justify-start items-center px-4 py-6 my-6 font-abdo">
        <h1 className="mb-4  text-xl md:text-xl lg:text-2xl text-start font-bold text-newRed">
          {t('eventsRoute')}
        </h1>
      </div>
      <div className="w-full flex flex-col justify-center items-center gap-y-4 px-8 lg:px-20">
        <div className="my-8 flex flex-col  justify-center items-center gap-y-5 md:flex-row md:grid md:grid-cols-2 lg:flex lg:flex-row lg:justify-between lg:flex-wrap w-full">
          {data.data.map((data) => {
            return (
              <EventsCard key={data.id} data={data} destination="singleEvent" />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Events;
