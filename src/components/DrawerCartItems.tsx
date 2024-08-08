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
      <div className=" w-full px-8 lg:px-20">
        <div className="flex justify-center items-center bg-white text-center my-8 py-5 rounded-2xl shadow-md ">
          <h1 className="text-black font-abdo font-light">{t('emptyCart')}</h1>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col justify-center items-center gap-y-1 z-40">
      {cartItems.map((item) => {
        return (
          <DrawerCartCard
            key={item.cartItem.id}
            item={item.cartItem}
            cart_id={item.cart_id}
          />
        );
      })}
    </div>
  );
};

export default DrawerCartItems;
