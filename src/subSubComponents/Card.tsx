import React from 'react';
import Modal from './Modal';
import { useTranslation } from 'react-i18next';
import { CartItem, CartItemWithId, SingleMealData } from '../assets/types';
import { RootState, useTypedSelector } from '../store';
import { WishlistButton, AmountInput } from '../subSubSubComponents';
import { useGlobalContext } from '../context/GlobalContext';

const Card: React.FC<{ data: SingleMealData }> = ({ data }) => {
  const { wishListItems } = useTypedSelector(
    (state: RootState) => state.mashawiWishList
  );
  const { cartItems } = useTypedSelector(
    (state: RootState) => state.theMashawiCart
  );
  const cartItem = cartItems.find((item) => item.cartItem.id === data.id);
  const [amount, setAmount] = React.useState<number>(
    cartItem?.cartItem.amount || 1
  );
  React.useEffect(() => {
    if (cartItem) {
      setAmount(cartItem.cartItem.amount);
    }
  }, [cartItem]);
  const { isLangArabic } = useGlobalContext();
  const modalId = `modal_${data.id}`;
  const { t } = useTranslation();
  const item = wishListItems.find(
    (i: CartItemWithId) => i.cartItem.id === data.id
  );
  const wishListProduct: CartItem = {
    id: data.id,
    name: data.name,
    price: data.price,
    image: data.image,
    amount: amount,
    additions: data.additions || [],
  };
  function formatPrice(price: number | string) {
    const numericPrice = Number(price);
    return parseFloat(numericPrice.toFixed(2)).toString();
  }

  return (
    <div
      className={`my-2 w-3/4 pb-2 md:w-[90%] lg:w-[22%] 2xl:w-1/5 ${
        isLangArabic
          ? 'rounded-tr-3xl rounded-bl-3xl'
          : 'rounded-tl-3xl rounded-br-3xl'
      } bg-white flex flex-col justify-center items-center gap-y-2 2xl:gap-y-10 relative`}
    >
      <WishlistButton
        data={data}
        item={item}
        wishListProduct={wishListProduct}
      />
      <img
        src={data.image}
        alt="img"
        className={`w-full aspect-square md:aspect-auto md:h-[348px]  ${
          isLangArabic
            ? 'rounded-tr-3xl rounded-bl-3xl'
            : 'rounded-tl-3xl rounded-br-3xl'
        }`}
      />
      <div className="flex px-4 lg:text-sm justify-between items-center w-full flex-row ">
        <h1 className="font-abdo font-bold 2xl:text-3xl">{data.name}</h1>
        <h2 className="font-abdo 2xl:text-3xl">
          {formatPrice(data.price)} {t('menuItemCurrency')}
        </h2>
      </div>
      <div className="flex px-2 gap-x-1 justify-between w-full flex-row  items-center my-2">
        <Modal data={data} modalId={modalId} />
        <AmountInput amount={amount} setAmount={setAmount} />
      </div>
    </div>
  );
};

export default Card;
