import React from 'react';
import addOrder from '../assets/svg/menu/addOrder.svg';
import AmountInput from './AmountInput';
import { useTranslation } from 'react-i18next';
import { SingleMealData } from '../assets/types';
interface ProductProps {
  data: SingleMealData;
  amount: number;
  setAmount: React.Dispatch<React.SetStateAction<number>>;
  handleAddToCart: () => void;
}
const ProductDetails: React.FC<ProductProps> = ({
  data,
  amount,
  setAmount,
  handleAddToCart,
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col  gap-y-2 justify-center items-center w-full">
      <img
        src={data.image}
        alt="img"
        className="rounded-tr-3xl rounded-bl-3xl w-full aspect-square"
      />
      <div className="flex justify-between flex-row w-full items-center my-2">
        <h1>{data.name}</h1>
        <h2>
          {data.price} {t('menuItemCurrency')}
        </h2>
      </div>
      <div className="flex justify-between w-full flex-row items-center my-2">
        <button
          className="btn bg-newRed text-white flex justify-between items-center px-4 rounded-full py-2"
          onClick={handleAddToCart}
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
