import React from 'react';
import Modal from './Modal';
import { useTranslation } from 'react-i18next';
import { CartItem } from '../assets/types';
import { useTypedSelector } from '../store';
import { WishlistButton,AmountInput } from '../subSubSubComponents';

const Card :React.FC<{data:CartItem}>= ({ data }) => {
  const [amount, setAmount] = React.useState<number>(data.amount || 1);
  const { wishListItems } = useTypedSelector((state) => state.wishList);
  const modalId = `modal_${data.id}`;
  const { t } = useTranslation();
  const item = wishListItems.find((i:CartItem) => i.id === data.id);
  const wishListProduct:CartItem = {
    id: data.id,
    name: data.name,
    price: data.price,
    currency: data.currency,
    img: data.img,
    amount: amount,
    addOns: data.addOns || [],
  };
  return (
    <div className=" my-2 w-4/5 pb-2 md:w-2/5 lg:w-80  rounded-tr-3xl rounded-bl-3xl bg-white flex flex-col justify-center items-center gap-y-2 relative">
      <WishlistButton
        data={data}
        item={item}
        wishListProduct={wishListProduct}
      />
      <img
        src={data.img}
        alt="img"
        className="w-full rounded-bl-3xl  rounded-tr-3xl"
      />
      <div className="flex px-4 justify-between items-center w-full flex-row my-2">
        <h1>{t(data.name)}</h1>
        <h2>
          {data.price} {t(data.currency)}
        </h2>
      </div>
      <div className="flex px-4 justify-between w-full flex-row  items-center my-2">
        <Modal data={data} theAmount={amount} modalId={modalId} />
        <AmountInput amount={amount} setAmount={setAmount} />
      </div>
    </div>
  );
};

export default Card;
