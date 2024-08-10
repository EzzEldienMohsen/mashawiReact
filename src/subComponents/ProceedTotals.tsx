import React from 'react';
import { useDispatch } from 'react-redux';
import { formatPrice } from '../utils';
import { clearCart } from '../features/cart/cartSlice';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AppDispatch, RootState, useTypedSelector } from '../store';

const ProceedTotals: React.FC = () => {
  const { cartTotal, tax, orderTotal } = useTypedSelector(
    (state: RootState) => state.theMashawiCart
  );
  const dispatch: AppDispatch = useDispatch();
  const clearTheCart = () => dispatch(clearCart());
  const { t } = useTranslation();
  return (
    <div className="flex flex-col my-4 py-4 justify-center items-center border-t-[2px] border-gray-500 w-full px-8 lg:px-20">
      <p className="text-newRed text-lg md:text-xl my-2 lg:text-2xl">
        {t('vatContentText')}
      </p>
      <p className=" pb-2 flex w-3/5 justify-between flex-row gap-x-4 text-newRed text-lg md:text-xl my-2 lg:text-2xl ">
        <span>{t('totalOrderText')}</span>
        <span>{formatPrice(cartTotal)}</span>
      </p>
      {/* SHIPPING */}
      {/* <p className=" pb-2 flex justify-between flex-row gap-x-4 text-newRed text-lg md:text-xl my-2 lg:text-2xl ">
        <span>{t('shippingText')}</span>
        <span className="font-medium">{formatPrice(shipping)}</span>
      </p> */}
      {/* TAX precentage */}
      <p className=" pb-2 flex w-3/5 justify-between flex-row gap-x-4 text-newRed text-lg md:text-xl my-2 lg:text-2xl ">
        <span>{t('taxrsText')}</span>
        <span className="font-medium">5%</span>
      </p>
      {/* TAX  */}
      <p className=" pb-2 flex w-3/5 justify-between flex-row gap-x-4 text-newRed text-lg md:text-xl my-2 lg:text-2xl ">
        <span>{t('taxValue')}</span>
        <span className="font-medium">{formatPrice(tax)}</span>
      </p>
      {/* ORDER TOTAL */}
      <p className=" pb-2 flex w-3/5 justify-between flex-row gap-x-4 text-newRed text-lg md:text-xl my-2 lg:text-2xl ">
        <span>{t('totalText')}</span>
        <span className="font-medium">{formatPrice(orderTotal)}</span>
      </p>
      <Link
        to="/card-data"
        className=" btn btn-block my-2 flex justify-center shadow-xl bg-newRed text-white items-center rounded-full"
      >
        {t('paymentAndOrderText')}
      </Link>

      <Link
        to="/meals"
        className=" btn btn-block my-2 flex justify-center shadow-xl bg-[#D9D9D9] items-center rounded-full"
      >
        {t('contiueSoppingText')}
      </Link>
      <button
        onClick={clearTheCart}
        className=" btn btn-block my-2 flex justify-center shadow-xl bg-[#D9D9D9] items-center rounded-full"
      >
        {t('clearCartText')}
      </button>
    </div>
  );
};

export default ProceedTotals;
