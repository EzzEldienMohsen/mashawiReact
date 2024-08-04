import React from 'react';
import { useDispatch } from 'react-redux';
import src from '../assets/svg/menu/addOns.svg';
import { useTranslation } from 'react-i18next';
import { addAddOns, removeAddOns } from '../features/cart/cartSlice';
import { AddOn, CartItem } from '../assets/types';
import { AppDispatch, useTypedSelector } from '../store';
import { AddOns, ProductDetails, WishlistButton } from '../subSubSubComponents';

interface ModalProps {
  modalId: string;
  theAmount: number;
  data: CartItem;
}

const Modal: React.FC<ModalProps> = ({ data, theAmount, modalId }) => {
  const [amount, setAmount] = React.useState<number>(theAmount);
  const [selectedAddOns, setSelectedAddOns] = React.useState<AddOn[]>([]);
  const [removeAddOnsList, setRemoveAddOnsList] = React.useState<AddOn[]>([]);
  const dispatch: AppDispatch = useDispatch();
  const { wishListItems } = useTypedSelector((state) => state.wishList);
  const item = wishListItems.find((i: CartItem) => i.id === data.id);
  const { t } = useTranslation();

  const handleAddOnChange = (addOn: AddOn, isChecked: boolean): void => {
    setSelectedAddOns((prevAddOns) =>
      isChecked
        ? [...prevAddOns, addOn]
        : prevAddOns.filter((ao) => ao.id !== addOn.id)
    );
  };

  const handleRemoveAddOnChange = (addOn: AddOn, isChecked: boolean): void => {
    setRemoveAddOnsList((prevRemoveAddOns) =>
      isChecked
        ? [...prevRemoveAddOns, addOn]
        : prevRemoveAddOns.filter((ao) => ao.id !== addOn.id)
    );
  };

  const cartProduct: CartItem = {
    id: data.id,
    name: data.name,
    price: data.price,
    currency: data.currency,
    img: data.img,
    amount,
    addOns: selectedAddOns,
  };

  const handleAddToCart = () => {
    if (selectedAddOns.length > 0) {
      dispatch(addAddOns({ cartID: data.id, addOns: selectedAddOns }));
    }
    if (removeAddOnsList.length > 0) {
      dispatch(
        removeAddOns({
          cartID: data.id,
          addOnIDs: removeAddOnsList.map((ao) => ao.id),
        })
      );
    }
    // dispatch(addItem({ product: { ...data, amount, addOns: selectedAddOns } }));
  };

  const wishListProduct: CartItem = {
    id: data.id,
    name: data.name,
    price: data.price,
    currency: data.currency,
    img: data.img,
    amount: amount,
    addOns: data.addOns || [],
  };

  return (
    <div>
      <button
        className="btn bg-newRed text-white text-xs flex-row flex justify-between w-full items-center px-2 rounded-full py-1"
        onClick={() =>
          (document.getElementById(modalId) as HTMLDialogElement).showModal()
        }
      >
        <img src={src} alt="alt" className="w-1/5"/>
        {t('addOnsText')}
      </button>
      <dialog id={modalId} className="modal overflow-y-auto">
        <div className="flex flex-col md:justify-between md:flex-row md:items-center w-[90vw] lg:w-[65vw] h-auto rounded-2xl gap-x-2 bg-white px-4 py-2">
          <div className="flex flex-col justify-center items-stretch relative gap-y-2">
            <WishlistButton
              data={data}
              item={item}
              wishListProduct={wishListProduct}
            />
            <ProductDetails
              data={data}
              amount={amount}
              setAmount={setAmount}
              cartProduct={cartProduct}
            />
          </div>
          <AddOns
            data={data}
            handleAddOnChange={handleAddOnChange}
            handleRemoveAddOnChange={handleRemoveAddOnChange}
          />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={handleAddToCart}>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default Modal;
