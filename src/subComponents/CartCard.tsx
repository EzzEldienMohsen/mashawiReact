import React from 'react';
import addOrder from '../assets/svg/menu/addOrder.svg';
import theClose from '../assets/svg/closeBtn.svg';
import { addItem } from '../features/cart/cartSlice';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { CartItem } from '../assets/types';
import { AmountInput } from '../subSubSubComponents';
import { AppDispatch } from '../store';
interface CartCardProps {
    item:CartItem;
    removeItemsFromCart:(cart:CartItem)=>void
}
const CartCard:React.FC<CartCardProps> = ({ item, removeItemsFromCart }) => {
  const { t } = useTranslation();
  const [amount, setAmount] = React.useState<number>(item.amount ||0);
  const dispatch:AppDispatch = useDispatch();
  const cartProduct:CartItem = {
    id: item.id,
    name: item.name,
    price: item.price,
    currency: item.currency,
    img: item.img,
    amount: amount,
    addOns: [],
  };
  const addItemToCart = () => {
    dispatch(addItem({ product: cartProduct }));
  };
  return (
    <div className="flex bg-white  w-full relative justify-start items-center pt-4 pb-2 px-2 my-2 gap-x-8 ">
      <button
        className="absolute top-2 left-2"
        onClick={() => removeItemsFromCart(item)}
      >
        <img src={theClose} alt="alt" />
      </button>
      <img src={item.img} alt="alt" className="w-1/5 aspect-square" />
      <div className="flex flex-col w-4/5 justify-center items-start gap-y-4">
        <h1>{t(item.name)}</h1>
        <p className="text-newRed flex flex-row gap-x-1">
          <span>{item.price}</span>
          <span>{t(item.currency)}</span>
        </p>
        <div className="flex flex-col justify-start items-start gap-y-4 md:flex-row md:justify-between md:items-center w-full">
          <h1>{t(item.name)}</h1>
          <AmountInput amount={amount} setAmount={setAmount} />
        </div>
      </div>
    </div>
  );
};

export default CartCard;
