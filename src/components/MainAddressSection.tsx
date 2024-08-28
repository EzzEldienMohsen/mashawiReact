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
import { useGlobalContext } from '../context/GlobalContext';

dayjs.extend(customParseFormat);
interface AddressQuery {
  queryKey: string[];
  queryFn: () => Promise<AddressResponse>;
}

const addressQuery = (language: string): AddressQuery => {
  return {
    queryKey: [language, 'address'],
    queryFn: () =>
      autoFetch('/branches?limit=4', {
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
const MainAddressSection: React.FC = () => {
  const { t } = useTranslation();
  const axiosData: any = useLoaderData();
  const data: AddressResponse = axiosData.data3.data;

  if (!data) {
    return (
      <div className="flex w-full py-8 justify-center items-center">
        <span className="loading loading-spinner loading-lg text-newRed"></span>
      </div>
    );
  }
  const unSortedItems = data.data;
  const sortedItems = unSortedItems.sort((a, b) => a.order - b.order);
  const convertToAmPm = (time24: string) => {
    return dayjs(time24, 'HH:mm').format('hh:mm A');
  };
  if (!data) {
    return (
      <div className="flex w-full py-8 justify-center items-center">
        <span className="loading loading-spinner loading-lg text-newRed"></span>
      </div>
    );
  }
  const { isLangArabic } = useGlobalContext();

  return (
    <div className="flex flex-col py-4 lg:py-16 mt-16 bg-[#F5F5F5] justify-center items-center gap-y-10 md:gap-y-[64px]  2xl:gap-y-[78px] my-2 w-full px-8 lg:px-[220px]">
      <SectionTitle title={t('branchesAndTimesTitle')} />
      <div className="flex mt-2 flex-col justify-center items-center md:flex md:flex-row lg:justify-start md:items-start md:flex-wrap md:gap-x-2 w-full ">
        {sortedItems.map((ad) => {
          const [isTruncated, setIsTruncated] = React.useState(true);
          const [isNameTruncated, setIsNameTruncated] = React.useState(true);

          const toggleTruncate = () => {
            setIsTruncated(!isTruncated);
          };
          const toggleNameTruncate = () => {
            setIsNameTruncated(!isTruncated);
          };
          const timeIn24 = ad.working_time;
          const theSplitTime = timeIn24.split('-');
          const theWantedTime = theSplitTime.map((time) => convertToAmPm(time));
          const theActualForm = theWantedTime.join(' - ');
          return (
            <div
              key={ad.id}
              className="rounded-2xl aspect-auto relative flex flex-col justify-evenly items-center bg-white py-6 gap-y-4 lg:gap-y-5 px-2 w-[90%] my-2 lg:w-[30%] 2xl:w-[23%] md:w-[45%]"
            >
              <img src={addressIcon} alt="alt" />
              <h1
                className={`text-black font-bold text-lg my-1 md:text-xl lg:text-2xl ${
                  isNameTruncated ? 'truncate max-w-[150px]' : ''
                } text-center`}
                style={{
                  whiteSpace: isNameTruncated ? 'nowrap' : 'normal',
                }}
                onClick={toggleNameTruncate}
              >
                {ad.name}
              </h1>
              <div className="w-full flex flex-col justify-start items-start gap-y-4 lg:gap-y-5 px-2">
                <p
                  className={`text-sm lg:text-[14.9px] text-start w-full mb-2 text-black px-1 break-all ${
                    isTruncated ? 'truncate max-w-[150px]' : ''
                  }`}
                  style={{
                    whiteSpace: isTruncated ? 'nowrap' : 'normal',
                  }}
                  onClick={toggleTruncate}
                >
                  {' '}
                  {ad.address}
                </p>
                <ul
                  className="flex justify-start items-center"
                  onClick={toggleTruncate}
                >
                  <li
                    className={`relative text-sm ${
                      isLangArabic ? 'pr-4 pl-0' : 'pl-4 pr-0'
                    } text-start lg:text-[14.9px] mb-2 text-black px-1 ${
                      isTruncated ? 'truncate' : ''
                    }`}
                  >
                    <span
                      className={`absolute ${
                        isLangArabic ? 'right-0' : 'left-0'
                      }`}
                      style={{
                        transform: 'translateY(-50%)',
                        top: '50%',
                      }}
                    >
                      •
                    </span>
                    {`${t('holiday')} ${ad.weekend}`}
                  </li>
                </ul>
              </div>
              <div className="flex flex-row gap-x-1 text-start items-center justify-between ">
                <div className="flex flex-row gap-x-1 justify-between ">
                  <img src={addMob} alt="alt" />{' '}
                  <p className="text-sm  2xl:text-lg">{ad.phone}</p>
                </div>
                <div className="flex flex-row gap-x-1 justify-between mr-2">
                  <img src={addTel} alt="alt" />{' '}
                  <p className="text-sm  2xl:text-lg">{ad.landing_phone}</p>
                </div>
              </div>

              <div
                className="flex w-4/5 md:w-[90%] 2xl:text-2xl rounded-full gap-x-2 py-2 flex-row justify-center items-center  bg-[#F4F4F4]  md:text-md  px-[4px]"
                dir="ltr"
              >
                <img src={addTime} alt="alt" />
                <p className="ml-2 text-lg">{theActualForm}</p>
              </div>
              <a
                href={ad.location}
                className="flex w-4/5 md:w-[90%] rounded-full gap-x-2 py-2 flex-row justify-center items-center  bg-newRed text-white text-lg min-h-[46px] h-auto  px-[4px] "
              >
                <img src={addressBtn} alt="alt" />
                <p className="ml-2 text-lg">{t('mapBtn')}</p>
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MainAddressSection;
