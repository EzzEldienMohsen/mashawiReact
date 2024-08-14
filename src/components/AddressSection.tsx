import React from 'react';
import { SectionTitle } from '../subComponents';
import { theAddress as address } from '../assets';
import { useTranslation } from 'react-i18next';

const AddressSection: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col justify-center items-center gap-y-4 my-2 w-full px-8 lg:px-20">
      <SectionTitle title={t('branchesAndTimesTitle')} />
      <div className="flex mt-2 flex-col justify-center items-center md:flex md:flex-row lg:justify-start md:items-start md:flex-wrap md:gap-x-2 w-full ">
        {address.map((ad) => {
          return (
            <div
              key={ad.id}
              className="rounded-2xl aspect-auto relative flex flex-col justify-evenly items-center bg-white py-2 gap-y-4 shadow-md px-2 w-[90%] my-2 lg:w-[32%] md:w-[45%] "
            >
              <img
                src={ad.icon}
                alt="alt"
                className="bg-[#F4F4F4] p-2 rounded-full"
              />
              <h1 className="text-black font-bold text-xl my-1 md:text-xl lg:text-lg">
                {t(ad.mainAddress)}
              </h1>
              <p className=" text-sm md:text-md lg:text-sm text-center mb-2 text-gray-600 px-1">
                {t(ad.sideAddress)}
              </p>
              <div className="flex flex-row gap-x-1 text-start items-center justify-between ">
                <div className="flex flex-row gap-x-1 justify-between lg:text-xs text-sm ">
                  <img src={ad.mobIcon} alt="alt" />{' '}
                  <p className="text-sm lg:text-md">{ad.mobNumber}</p>
                </div>
                <div className="flex flex-row gap-x-1 justify-between lg:text-xs text-sm mr-2">
                  <img src={ad.phIcon} alt="alt" />{' '}
                  <p className=" text-sm lg:text-md">{ad.phNumber}</p>
                </div>
              </div>
              <div className="flex w-4/5 md:w-[90%] rounded-3xl gap-x-2 py-2 flex-row justify-center items-center  bg-[#F4F4F4]  md:text-md px-[4px] ">
                <img src={ad.timeIcon} alt="alt" />
                <p className="ml-2 text-sm">{ad.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AddressSection;
