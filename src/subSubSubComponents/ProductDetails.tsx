import React from 'react';
import addOrder from '../assets/svg/menu/addOrder.svg';
import AmountInput from './AmountInput';
import { useTranslation } from 'react-i18next';
import { SingleMealData } from '../assets/types';
// import fallbackImage from '../assets/svg/imageGuard.svg';
import { useGlobalContext } from '../context/GlobalContext';
import ImageSlider from './ImageSlider';

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
  const { isLangArabic } = useGlobalContext();
  const { t } = useTranslation();
  function formatPrice(price: number | string | undefined) {
    const numericPrice = Number(price);
    return parseFloat(numericPrice.toFixed(2)).toString();
  }
  function convertToArabicNumbers(number: string): string {
    const arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];

    return number.replace(/\d/g, (digit) => arabicNumbers[parseInt(digit)]);
  }
  const [isTruncated, setIsTruncated] = React.useState(true);

  const toggleTruncate = () => {
    setIsTruncated(!isTruncated);
  };
  return (
    <div className="flex flex-col  gap-y-2 2xl:gap-y-6 justify-center items-center w-full">
      {/* <img
        src={data.image}
        alt="img"
        className={`${
          isLangArabic
            ? 'rounded-tr-3xl rounded-bl-3xl'
            : 'rounded-tl-3xl rounded-br-3xl'
        } w-full aspect-[4/3] object-cover`} // Add object-cover or object-contain here
        onError={(e) => {
          e.currentTarget.src = fallbackImage;
          e.currentTarget.className += ' object-cover'; // Ensures the fallback image respects the object-fit style
        }}
      /> */}
      <ImageSlider isLangArabic={isLangArabic} gallery={data.gallery} />
      <div className="flex justify-between flex-row w-full items-center my-2">
        <h1
          className={`font-abdo font-bold text-4 2xl:text-xl break-all ${
            isTruncated ? 'truncate' : ''
          }`}
          style={{
            maxWidth: '150px',
            whiteSpace: isTruncated ? 'nowrap' : 'normal',
          }}
          onClick={toggleTruncate}
        >
          {data.name}
        </h1>
        <h2 className="font-abdo text-4 2xl:text-xl text-newRed">
          {`${
            isLangArabic
              ? convertToArabicNumbers(formatPrice(data.price))
              : formatPrice(data.price)
          }  ${t('menuItemCurrency')} `}
        </h2>
      </div>
      <div className="flex justify-evenly w-full flex-row items-center my-2">
        <button
          className="btn bg-newRed text-white flex justify-evenly lg:gap-x-[6px] items-center px-4 rounded-full py-1 lg:w-[45%]  2xl:py-2 2xl:px-4 2xl:min-h-[40px] 2xl:h-auto"
          onClick={handleAddToCart}
        >
          <img src={addOrder} alt="alt" className="w-1/5 lg:w-[15%] " />
          <span className="font-abdo text-[10px] lg:text-lg 2xl:text-2xl">
            {t('addOrder')}
          </span>
        </button>
        <AmountInput amount={amount} setAmount={setAmount} />
      </div>
    </div>
  );
};

export default ProductDetails;
