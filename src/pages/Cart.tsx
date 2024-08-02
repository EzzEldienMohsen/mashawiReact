import React from 'react';
import { CartItems, CartTotals } from '../components';
import { useTranslation } from 'react-i18next';

const Cart:React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col justify-center items-center gap-y-6 w-full px-4 lg:px-20 py-8">
      <div className="bg-[#2C2220] flex flex-col text-start  w-full justify-start items-center px-4 py-6 my-6 font-abdo">
        <h1 className=" text-xl md:text-xl lg:text-2xl text-start font-bold text-newRed">
          {t('cartTitle')}
        </h1>
      </div>
      <CartItems />
      <CartTotals />
    </div>
  );
};

export default Cart;
