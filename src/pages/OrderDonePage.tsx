import React from 'react';
import { useTranslation } from 'react-i18next';
import { Steps } from '../components';
import { completed } from '../assets';
import like from '../assets/svg/delivery/like.svg';
const OrderDonePage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col justify-center items-center w-full my-2">
      <div className="bg-[#2C2220] flex flex-col text-start w-full justify-start items-center px-4 py-6 my-6 font-abdo">
        <h1 className="mb-4 text-xl md:text-xl lg:text-2xl text-start font-bold text-newRed">
          {t('orderDoneTitle')}
        </h1>
      </div>
      <div className="w-full flex flex-col justify-center items-center gap-y-6 md:gap-y-20 px-4 md:px-8 lg:px-20">
        <Steps tracker={completed} />
        <div className="flex flex-col gap-y-3 justify-center items-center text-sm md:text-md lg:text-lg font-abdo py-6 md:py-10 bg-white w-4/5 rounded-2xl px-6 md:px-10 lg:px-20 shadow-lg">
          <img src={like} alt="like" />
          <h1 className="text-black text-center">{t('deliveryText')}</h1>
        </div>
      </div>
    </div>
  );
};

export default OrderDonePage;
