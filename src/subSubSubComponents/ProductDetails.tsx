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
  function formatPrice(price: number | string | undefined) {
    const numericPrice = Number(price);
    return parseFloat(numericPrice.toFixed(2)).toString();
  }
  return (
    <div className="flex flex-col  gap-y-2 2xl:gap-y-6 justify-center items-center w-full">
      <img
        src={data.image}
        alt="img"
        className="rounded-tr-3xl rounded-bl-3xl w-full aspect-[4/3]"
      />
      <div className="flex justify-between flex-row w-full items-center my-2">
        <h1 className="font-abdo font-bold 2xl:text-3xl">{data.name}</h1>
        <h2 className="font-abdo 2xl:text-3xl">
          {formatPrice(data.price)} {t('menuItemCurrency')}
        </h2>
      </div>
      <div className="flex justify-between w-full flex-row items-center my-2">
        <button
          className="btn bg-newRed text-white flex justify-between items-center px-4 rounded-full py-2 2xl:w-2/5 2xl:py-4 2xl:px-5"
          onClick={handleAddToCart}
          style={{ height: 'auto', minHeight: '40px' }}
        >
          <img src={addOrder} alt="alt" className="2xl:w-1/4" />
          <span className="font-abdo 2xl:text-3xl">{t('addOrder')}</span>
        </button>
        <AmountInput amount={amount} setAmount={setAmount} />
      </div>
    </div>
  );
};

export default ProductDetails;
