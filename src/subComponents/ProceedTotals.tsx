import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AppDispatch, RootState, useTypedSelector } from '../store';
import { useGlobalContext } from '../context/GlobalContext';
import { useDispatch } from 'react-redux';
import { getTotals } from '../features/orders/ordersSlice';
interface ProceedTotalProps {
  onSubmit: (e: React.FormEvent) => void;
}
const ProceedTotals: React.FC<ProceedTotalProps> = ({ onSubmit }) => {
  const { user } = useTypedSelector((state: RootState) => state.user);
  const token = user.token;
  const { isLangArabic } = useGlobalContext();
  const language = isLangArabic ? 'ar' : 'en';
  const dispatch: AppDispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getTotals({ token, language }));
  }, [token, language]);
  const { isLoading, orderTotal } = useTypedSelector(
    (state: RootState) => state.orders
  );
  console.log(orderTotal);
  const { t } = useTranslation();
  function formatThePrice(price: number | string) {
    const numericPrice = Number(price);
    return parseFloat(numericPrice.toFixed(2)).toString();
  }

  return (
    <div className="flex flex-col my-4 py-4 justify-between md:justify-center items-center border-t-[2px] border-gray-500 w-full px-8 lg:px-20">
      <p className="text-newRed text-lg md:text-xl my-2 lg:text-2xl">
        {t('vatContentText')}
      </p>
      <div className="w-full flex justify-between items-center">
        <p className="text-black font-abdo text-xs md:text-lg lg:text-xl">
          {t('subTotal')}
        </p>
        <p className="text-black font-abdo text-xs md:text-lg lg:text-xl">
          {` ${orderTotal.sub_total} ${t('menuItemCurrency')}`}
        </p>
      </div>
      <div className="w-full flex justify-between items-center ">
        <p className="text-black font-abdo text-xs md:text-lg lg:text-xl">
          {`${t('tax')} ${formatThePrice(orderTotal.vat_percent)}%`}
        </p>
        <p className="text-black font-abdo text-xs md:text-lg lg:text-xl">
          {` ${orderTotal.vat} ${t('menuItemCurrency')}`}
        </p>
      </div>
      {orderTotal.total_before && (
        <div className="w-full flex justify-between items-center">
          <p className="text-black font-abdo text-xs md:text-lg lg:text-xl">
            {t('couponDiscount')}
          </p>
          <p className="text-black font-abdo text-xs md:text-lg lg:text-xl">
            {` ${orderTotal.total_before} ${t('menuItemCurrency')}`}
          </p>
        </div>
      )}
      <div className="w-full flex justify-between items-center">
        <p className="text-black font-abdo text-xs md:text-lg lg:text-xl">
          {t('couponDiscount')}
        </p>
        <p className="text-black font-abdo text-xs md:text-lg lg:text-xl">
          {orderTotal.discount}
        </p>
      </div>
      {orderTotal.total_after && (
        <div className="w-full flex justify-between items-center">
          <p className="text-black font-abdo text-xs md:text-lg lg:text-xl">
            {t('couponDiscount')}
          </p>
          <p className="text-black font-abdo text-xs md:text-lg lg:text-xl">
            {` ${orderTotal.total_after} ${t('menuItemCurrency')}`}
          </p>
        </div>
      )}
      <div className="w-full flex justify-between items-center">
        <p className="text-black font-abdo text-sm md:text-xl lg:text-3xl ">
          {t('totalOrderText')}
        </p>
        <p className="text-newRed font-abdo text-sm md:text-xl lg:text-3xl">
          {` ${orderTotal.total} ${t('menuItemCurrency')}`}
        </p>
      </div>
      <button
        type="submit"
        disabled={isLoading}
        onSubmit={onSubmit}
        className=" btn btn-block md:w-1/2 lg:w-3/4 my-2 min-h-[48px] lg:min-h-[56px] h-auto text-sm lg:text-2xl flex justify-center shadow-xl bg-newRed text-white items-center rounded-full"
      >
        {isLoading ? (
          <span className="loading loading-spinner loading-lg text-white"></span>
        ) : (
          t('paymentAndOrderText')
        )}
      </button>

      <Link
        to="/meals"
        className=" btn btn-block md:w-1/2 lg:w-3/4 my-2 min-h-[48px] lg:min-h-[56px] h-auto text-sm lg:text-2xl flex justify-center shadow-xl bg-[#D9D9D9] items-center rounded-full"
      >
        {t('contiueSoppingText')}
      </Link>
    </div>
  );
};

export default ProceedTotals;
