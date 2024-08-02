import React from 'react';
import addOrder from '../assets/svg/menu/addOrder.svg';
import { useDispatch } from 'react-redux';
import { addItem as addToCart } from '../features/cart/cartSlice';
import AmountInput from './AmountInput';
import { useTranslation } from 'react-i18next';
import { CartItem } from '../assets/types';
import { AppDispatch } from '../store';
interface ProductProps {
  data: CartItem;
  amount: number;
  setAmount: React.Dispatch<React.SetStateAction<number>>;
  cartProduct: CartItem;
}
const ProductDetails:React.FC<ProductProps> = ({ data, amount, setAmount, cartProduct }) => {
  const dispatch:AppDispatch = useDispatch();
  const { t } = useTranslation();
  const addItemToCart = () => {
    dispatch(addToCart({ product: cartProduct }));
  };

  return (
    <div className="flex flex-col w-full gap-y-2 justify-center items-center">
      <img src={data.img} alt="img" className="rounded-tr-3xl rounded-bl-3xl" />
      <div className="flex justify-between flex-row w-full items-center my-2">
        <h1>{t(data.name)}</h1>
        <h2>
          {data.price} {t(data.currency)}
        </h2>
      </div>
      <div className="flex justify-between w-full flex-row items-center my-2">
        <button
          className="btn bg-newRed text-white flex justify-between items-center px-4 rounded-full py-2"
          onClick={addItemToCart}
        >
          <img src={addOrder} alt="alt" />
          اضف الطلب
        </button>
        <AmountInput amount={amount} setAmount={setAmount} />
      </div>
    </div>
  );
};

export default ProductDetails;
