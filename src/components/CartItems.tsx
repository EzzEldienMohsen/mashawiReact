import React from 'react';
import { useDispatch } from 'react-redux';
import { removeItem } from '../features/cart/cartSlice';
import { CartCard } from '../subComponents';
import { AppDispatch, RootState, useTypedSelector } from '../store';
import { CartItem } from '../assets/types';

const CartItems:React.FC = () => {
  const dispatch :AppDispatch= useDispatch();
  const removeItemsFromCart = (prod:CartItem) => {
    dispatch(removeItem(prod));
  };
  const { cartItems } = useTypedSelector((state:RootState) => state.mashawiCart);
  console.log(cartItems);
  return (
    <div className="my-16 w-full flex flex-col justify-center items-center">
      {cartItems.map((item) => {
        return (
          <CartCard
            key={item.id}
            item={item}
            removeItemsFromCart={removeItemsFromCart}
          />
        );
      })}
    </div>
  );
};

export default CartItems;
