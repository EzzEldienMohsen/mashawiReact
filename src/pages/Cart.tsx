import React from 'react';
import { CartItems, CartTotals } from '../components';
import { useTranslation } from 'react-i18next';
import { useGlobalContext } from '../context/GlobalContext';
import { AppDispatch, RootState, useTypedSelector } from '../store';
import { useDispatch } from 'react-redux';
import { clearCart, getCart } from '../features/cart/cartSlice';

const Cart: React.FC = () => {
  const { t } = useTranslation();
  const { isLangArabic } = useGlobalContext();
  const { user } = useTypedSelector((state: RootState) => state.user);
  const language = isLangArabic ? 'ar' : 'en';
  const token = user.token;
  const dispatch: AppDispatch = useDispatch();
  const getTheCart = async () => {
    await dispatch(clearCart());
    await dispatch(getCart({ token, language }));
  };
  React.useEffect(() => {
    getTheCart();
  }, [token, language]);
  return (
    <div className="flex flex-col justify-center items-center gap-y-6 w-full  py-8">
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
