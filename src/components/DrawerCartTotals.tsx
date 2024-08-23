import React from 'react';
import { formatPrice } from '../utils';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { RootState, useTypedSelector } from '../store';
interface CartDrawer {
  closeDrawer: () => void;
}

const DrawerCartTotals: React.FC<CartDrawer> = ({ closeDrawer }) => {
  const { user } = useTypedSelector((state: RootState) => state.user);
  const token = user.token;
  const { cartTotal } = useTypedSelector(
    (state: RootState) => state.theMashawiCart
  );
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-y-4 fixed bg-white bottom-0 left-0 z-50 justify-center items-center py-5  w-full ">
      <p className="text-newRed font-abdo lg:text-xl">{t('vatContentText')}</p>
      <p className=" pb-2 flex w-3/5 justify-between flex-row gap-x-4 text-newRed text-sm ">
        <span className="font-abdo text-3xl font-semibold">
          {t('totalOrderText')}
        </span>
        <span className="font-abdo text-3xl font-semibold">
          {formatPrice(cartTotal)}
        </span>
      </p>

      {token ? (
        <Link
          onClick={closeDrawer}
          to="/proceed"
          className=" btn w-4/5 my-2 flex justify-center shadow-xl bg-newRed text-white items-center rounded-full min-h-[58px] h-auto text-2xl"
        >
          {t('paymentAndOrderText')}
        </Link>
      ) : (
        <Link
          onClick={closeDrawer}
          to="/login"
          className=" btn w-4/5 my-2 flex justify-center shadow-xl bg-newRed text-white items-center rounded-full min-h-[58px] h-auto text-2xl"
        >
          {t('paymentAndOrderText')}
        </Link>
      )}

      <button
        onClick={closeDrawer}
        className=" btn flex justify-center shadow-xl bg-[#D9D9D9] items-center w-4/5 rounded-full min-h-[58px] h-auto text-2xl"
      >
        {t('contiueSoppingText')}
      </button>
    </div>
  );
};

export default DrawerCartTotals;
