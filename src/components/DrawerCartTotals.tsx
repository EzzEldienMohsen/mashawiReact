import React from 'react';
import { formatPrice } from '../utils';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { RootState, useTypedSelector } from '../store';

const DrawerCartTotals: React.FC = () => {
  const { cartTotal } = useTypedSelector(
    (state: RootState) => state.theMashawiCart
  );
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-y-4 fixed bg-white bottom-0 left-0 z-50 justify-center items-center py-8  w-full ">
      <p className="text-newRed  lg:text-lg">{t('vatContentText')}</p>
      <p className=" pb-2 flex w-3/5 justify-between flex-row gap-x-4 text-newRed text-sm ">
        <span>{t('totalOrderText')}</span>
        <span>{formatPrice(cartTotal)}</span>
      </p>

      <Link
        to="/proceed"
        className=" btn flex justify-center shadow-xl bg-newRed text-white items-center w-4/5 rounded-full"
      >
        {t('paymentAndOrderText')}
      </Link>

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
