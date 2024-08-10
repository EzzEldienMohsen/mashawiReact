import React from 'react';
import { theAddress as address } from '../assets';
import { useTranslation } from 'react-i18next';
import { useGlobalContext } from '../context/GlobalContext';
import { Link } from 'react-router-dom';

const MyAddress: React.FC = () => {
  const { isLangArabic } = useGlobalContext();
  const { t } = useTranslation();
  return (
    <div className="flex mt-2 flex-col relative px-8 lg:px-20 justify-center pt-24 items-center md:grid md:grid-cols-2 lg:flex lg:flex-row lg:justify-between lg:items-start md:gap-4 lg:gap-x-2 w-full ">
      <Link
        to="/new-address"
        className={`btn w-1/5 absolute top-0 ${
          isLangArabic ? 'left-20' : 'right-20'
        } bg-newRed text-white rounded-full my-1`}
      >
        {t('editAddressText')}
      </Link>
      {address.map((ad) => {
        return (
          <div
            key={ad.id}
            className="rounded-2xl aspect-auto  flex flex-col justify-evenly items-center bg-white py-2 gap-y-4 shadow-md w-5/6 my-2 lg:w-1/4 md:w-auto"
          >
            <img
              src={ad.icon}
              alt="alt"
              className="bg-[#F4F4F4] p-2 rounded-full"
            />
            <h1 className="text-black font-bold text-xl my-1 md:text-xl lg:text-lg">
              {t(ad.mainAddress)}
            </h1>
            <p className="text-start text-sm md:text-md lg:text-sm mb-2 text-gray-600 px-1">
              {t(ad.sideAddress)}
            </p>
            <div className="flex flex-row text-start items-center justify-between px-1 text-md md:text-xs lg:text-sm">
              <div className="flex flex-row gap-x-1 text-start items-center justify-between ">
                <div className="flex flex-row gap-x-1 justify-between lg:text-xs text-sm ">
                  <img src={ad.mobIcon} alt="alt" />{' '}
                  <p className="text-sm lg:text-xs">{ad.mobNumber}</p>
                </div>
                <div className="flex flex-row gap-x-1 justify-between lg:text-xs text-sm mr-2">
                  <img src={ad.phIcon} alt="alt" />{' '}
                  <p className=" text-sm lg:text-xs">{ad.phNumber}</p>
                </div>
              </div>
            </div>
            <button className="btn w-3/5 bg-newRed text-white rounded-full my-1">
              {t('editAddressText')}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default MyAddress;
