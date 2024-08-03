import React from 'react';
import { useDispatch } from 'react-redux';
import { formatPrice } from '../utils';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AppDispatch, RootState, useTypedSelector } from '../store';

const DrawerCartTotals: React.FC = () => {
      const { cartTotal, shipping, tax, orderTotal } = useTypedSelector(
        (state: RootState) => state.theMashawiCart
      );
      const dispatch: AppDispatch = useDispatch();
      const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-y-4 fixed bg-white bottom-0 left-0 z-50 justify-center items-center py-8  w-full ">
      <p className="text-newRed  lg:text-lg">
        {t('vatContentText')}
      </p>
      <p className=" pb-2 flex w-3/5 justify-between flex-row gap-x-4 text-newRed text-sm ">
        <span>{t('totalOrderText')}</span>
        <span>{formatPrice(cartTotal)}</span>
      </p>
      {/* SHIPPING
      <p className=" pb-2 flex justify-between flex-row gap-x-4 text-newRed text-lg md:text-xl my-2 lg:text-2xl ">
        <span>{t('shippingText')}</span>
        <span className="font-medium">{formatPrice(shipping)}</span>
      </p>
      {/* TAX */}
      {/* <p className=" pb-2 flex justify-between flex-row gap-x-4 text-newRed text-lg md:text-xl my-2 lg:text-2xl ">
        <span>{t('taxrsText')}</span>
        <span className="font-medium">{formatPrice(tax)}</span>
      </p>
      {/* ORDER TOTAL */}
      {/* <p className=" pb-2 flex justify-between flex-row gap-x-4 text-newRed text-lg md:text-xl my-2 lg:text-2xl ">
        <span>{t('totalText')}</span>
        <span className="font-medium">{formatPrice(orderTotal)}</span>
      </p>   */}
      <button className=" btn flex justify-center shadow-xl bg-newRed text-white items-center w-4/5 rounded-full">
        {t('paymentAndOrderText')}
      </button>

      <Link
        to="/menuList"
        className=" btn flex justify-center shadow-xl bg-[#D9D9D9] items-center w-4/5 rounded-full"
      >
        {t('contiueSoppingText')}
      </Link>
     
    </div>
  );
};

export default DrawerCartTotals;
