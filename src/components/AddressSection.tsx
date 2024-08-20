import React from 'react';
import { SectionTitle } from '../subComponents';
import addressIcon from '../assets/svg/address.svg';
import addMob from '../assets/svg/addMob.svg';
import addTel from '../assets/svg/addTel.svg';
import addTime from '../assets/svg/addTime.svg';
import { useTranslation } from 'react-i18next';
import { AddressResponse } from '../assets/types';
import { autoFetch } from '../utils';
import { QueryClient } from '@tanstack/react-query';
import { useLoaderData } from 'react-router-dom';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import addressBtn from '../assets/svg/addressMapButton.svg';

dayjs.extend(customParseFormat);

interface AddressQuery {
  queryKey: string[];
  queryFn: () => Promise<AddressResponse>;
}

const addressQuery = (language: string): AddressQuery => {
  return {
    queryKey: [language, 'address'],
    queryFn: () =>
      autoFetch('/branches', {
        headers: {
          lang: language,
        },
      }),
  };
};
export const loader =
  (queryClient: QueryClient, language: string) =>
  async (): Promise<AddressResponse> => {
    const data = await queryClient.ensureQueryData(addressQuery(language));
    return data;
  };

const AddressSection: React.FC = () => {
  const { t } = useTranslation();
  const axiosData: any = useLoaderData();
  const data: AddressResponse = axiosData.data;
  const unSortedItems = data.data;
  const sortedItems = unSortedItems.sort((a, b) => a.order - b.order);
  const convertToAmPm = (time24: string) => {
    return dayjs(time24, 'HH:mm').format('hh:mm A');
  };
  return (
    <div className="flex flex-col justify-center items-center gap-y-4 my-2 w-full px-8 lg:px-20">
      <SectionTitle title={t('branchesAndTimesTitle')} />
      <div className="flex mt-2 flex-col justify-center items-center md:flex md:flex-row lg:justify-start md:items-start md:flex-wrap md:gap-x-2 w-full ">
        {sortedItems.map((ad) => {
          const timeIn24 = ad.working_time;
          const theSplitTime = timeIn24.split('-');
          const theWantedTime = theSplitTime.map((time) => convertToAmPm(time));
          const theActualForm = theWantedTime.join(' - ');
          return (
            <div
              key={ad.id}
              className="rounded-2xl aspect-auto relative flex flex-col justify-evenly items-center bg-white py-2 gap-y-4 shadow-md px-2 w-[90%] my-2 lg:w-[23%] md:w-[45%] lg:h-[400px]"
            >
              <img src={addressIcon} alt="alt" />
              <h1 className="text-black font-bold text-xl my-1 md:text-xl lg:text-lg">
                {ad.name}
              </h1>
              <p className=" text-sm md:text-md lg:text-sm text-center mb-2 text-gray-600 px-1">
                {ad.address}
              </p>
              <div className="flex flex-row gap-x-1 text-start items-center justify-between ">
                <div className="flex flex-row gap-x-1 justify-between lg:text-xs text-sm ">
                  <img src={addMob} alt="alt" />{' '}
                  <p className="text-sm lg:text-md">{ad.phone}</p>
                </div>
                <div className="flex flex-row gap-x-1 justify-between lg:text-xs text-sm mr-2">
                  <img src={addTel} alt="alt" />{' '}
                  <p className=" text-sm lg:text-md">{ad.landing_phone}</p>
                </div>
              </div>
              <div
                className="flex w-4/5 md:w-[90%] rounded-3xl gap-x-2 py-2 flex-row justify-center items-center  bg-[#F4F4F4]  md:text-md px-[4px]"
                dir="ltr"
              >
                <img src={addTime} alt="alt" />
                <p className="ml-2 text-sm">{theActualForm}</p>
              </div>
              <a
                href={ad.location}
                className="flex w-4/5 md:w-[90%] rounded-3xl gap-x-2 py-2 flex-row justify-center items-center  bg-newRed text-white  md:text-md px-[4px] "
              >
                <img src={addressBtn} alt="alt" />
                <p className="ml-2 text-sm">{t('mapBtn')}</p>
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AddressSection;
