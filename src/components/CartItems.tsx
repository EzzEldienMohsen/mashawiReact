import React from 'react';
import { useDispatch } from 'react-redux';
import { removeItem } from '../features/cart/cartSlice';
import { CartCard } from '../subComponents';
import { AppDispatch, RootState, useTypedSelector } from '../store';
import { CartItem } from '../assets/types';
import { useTranslation } from 'react-i18next';

const CartItems: React.FC = () => {
  const { t } = useTranslation();
  const dispatch: AppDispatch = useDispatch();
  const removeItemsFromCart = (prod: CartItem) => {
    dispatch(removeItem(prod));
  };
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
    <div className="my-16 w-full flex flex-col justify-center items-center px-8 lg:px-20">
      {cartItems.map((item) => {
        return (
          <CartCard
            key={item.cartItem.id}
            item={item.cartItem}
            cart_id={item.cart_id}
            removeItemsFromCart={removeItemsFromCart}
          />
        );
      })}
    </div>
  );
};

export default CartItems;
