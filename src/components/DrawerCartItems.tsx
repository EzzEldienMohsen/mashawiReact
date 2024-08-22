import React from 'react';
import { RootState, useTypedSelector } from '../store';
import { DrawerCartCard } from '../subComponents';
import { useTranslation } from 'react-i18next';

const DrawerCartItems: React.FC = () => {
  const { t } = useTranslation();
  const { cartItems } = useTypedSelector(
    (state: RootState) => state.theMashawiCart
  );
  if (cartItems.length === 0) {
    return (
      <div className=" w-full ">
        <div className="flex justify-center items-center bg-white text-center my-8 p-5 w-full rounded-2xl shadow-md ">
          <h1 className="text-black font-abdo font-light 2xl:text-xl">
            {t('emptyCart')}
          </h1>
        </div>
      </div>
    );
  }
  return (
    <div className="flex w-full flex-col justify-center items-center gap-y-1 2xl:gap-y-3 z-40">
      {cartItems.map((item) => {
        return (
          <DrawerCartCard
            key={item.cart_id}
            item={item.cartItem}
            cart_id={item.cart_id}
          />
        );
      })}
    </div>
  );
};

export default DrawerCartItems;
