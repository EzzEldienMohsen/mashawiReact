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
    <div className="flex bg-white flex-col w-full justify-center items-center relative pt-4 pb-2 px-2 my-2 rounded-xl md:justify-between md:flex-row gap-y-3 md:gap-y-0">
      <button
        className="absolute top-2 left-2"
        onClick={() => removeItemsFromCart(item)}
      >
        <img src={theClose} alt="alt" />
      </button>
      <div className="flex flex-row justify-between items-center md:w-1/2 gap-x-4">
        <img src={item.img} alt="alt" className="w-32 aspect-square" />
        <h1>{t(item.name)}</h1>
        <p className="text-newRed flex flex-row gap-x-1">
          <span>{item.price}</span>
          <span>{t(item.currency)}</span>
        </p>
      </div>
      <div className="flex flex-row justify-evenly items-center w-full md:w-1/3 my-2 md:my-0 ">
       
        <AmountInput amount={amount} setAmount={setAmount} />
      </div>
    </div>
  );
};

export default CartCard;
