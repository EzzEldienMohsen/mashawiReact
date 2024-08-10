import React from 'react';
import theClose from '../assets/svg/closeBtn.svg';

import { myOrders } from '../assets';
import { useTranslation } from 'react-i18next';
import { useGlobalContext } from '../context/GlobalContext';

const Orders: React.FC = () => {
  const { isLangArabic } = useGlobalContext();
  const { t } = useTranslation();
  return (
    <div className="my-4 w-full flex flex-col px-8 lg:px-20 gap-y-6 justify-center items-center">
      {myOrders.map((order) => {
        return (
          <div
            key={order.id}
            className="flex flex-col rounded-2xl justify-center items-start  bg-white px-4 py-6 relative gap-y-4 md:flex-row w-full md:justify-between lg:px-2 lg:gap-x-6"
          >
            <button
              className={`absolute md:hidden top-2 ${
                isLangArabic ? 'left-2' : 'right-2'
              }`}
            >
              <img src={theClose} alt="alt" />
            </button>
            <h1 className="underLine font-bold font-abdo text-black text-md md:text-lg lg:text-xl">
              {t(order.title)}
            </h1>
            <div className="flex flex-row-reverse md:flex-row justify-between items-center gap-x-4 w-full md:w-1/3">
              <p className="text-xs md:text-sm lg:text-md font-abdo text-[#939393]">
                {t(order.date)}
              </p>
              <div className="flex justify-start items-center gap-x-2">
                <p className="text-newRed text-sm md:text-md lg:text-lg font-abdo font-medium">
                  {t(order.price)}
                </p>
                <p className="text-newRed text-sm md:text-md lg:text-lg font-abdo font-medium">
                  {t(order.currency)}
                </p>
              </div>
            </div>
            <button className={`hidden md:block`}>
              <img src={theClose} alt="alt" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Orders;
