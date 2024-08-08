import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import src from '../assets/svg/menu/addOns.svg';
import { useTranslation } from 'react-i18next';
import {
  addAddOns,
  addThisItemToCart,
  removeAddOns,
} from '../features/cart/cartSlice';
import { AddOn, CartItem, SingleMealData } from '../assets/types';
import { AppDispatch, RootState, useTypedSelector } from '../store';
import { AddOns, ProductDetails, WishlistButton } from '../subSubSubComponents';
import { addItem as addToCart } from '../features/cart/cartSlice';

interface ModalProps {
  modalId: string;
  theAmount: number;
  data: SingleMealData;
}

const Modal: React.FC<ModalProps> = ({ data, theAmount, modalId }) => {
  const [amount, setAmount] = React.useState<number>(theAmount);
  const [selectedAddOns, setSelectedAddOns] = React.useState<AddOn[]>([]);
  const [removeAddOnsList, setRemoveAddOnsList] = React.useState<AddOn[]>([]);
  const dispatch: AppDispatch = useDispatch();
  const { wishListItems } = useTypedSelector(
    (state: RootState) => state.wishList
  );
  const item = wishListItems.find((i: CartItem) => i.id === data.id);
  const { t } = useTranslation();
  const dialogRef = useRef<HTMLDialogElement>(null);

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
    image: data.image,
    amount: amount,
    additions: data.additions || [],
  };

  const handleAddToCart = () => {
    if (selectedAddOns.length > 0) {
      dispatch(addAddOns({ cartID: data.id, additions: selectedAddOns }));
    }
    if (removeAddOnsList.length > 0) {
      dispatch(
        removeAddOns({
          cartID: data.id,
          addOnIDs: removeAddOnsList.map((ao) => ao.id),
        })
      );
    }
    dispatch(addToCart({ product: cartProduct }));
    dispatch(
      addThisItemToCart({
        meal_id: data.id,
        qty: amount,
        additions: cartProduct.additions.flatMap((item) =>
          item.values.map((value) => ({
            id: item.id,
            value: value.id,
          }))
        ),
      })
    );
    dialogRef.current?.close();
  };

  const closeModal = () => dialogRef.current?.close();

  const handleClickOutside = (
    e: React.MouseEvent<HTMLDialogElement, MouseEvent>
  ) => {
    if (e.target === dialogRef.current) {
      closeModal();
    }
  };

  const wishListProduct: CartItem = {
    id: data.id,
    name: data.name,
    price: data.price,
    image: data.image,
    amount: amount,
    additions: data.additions || [],
  };

  return (
    <div>
      <button
        className="btn bg-newRed text-white font-abdo font-thin text-sm flex-row flex justify-evenly w-full items-center px-5 lg:px-3 rounded-full py-1"
        onClick={() => dialogRef.current?.showModal()}
      >
        <img src={src} alt="alt" className=" lg:w-1/4" />
        {t('addOnsText')}
      </button>
      <dialog
        ref={dialogRef}
        id={modalId}
        className="modal overflow-y-auto mr-5 w-full flex justify-center items-center "
        onClick={handleClickOutside}
      >
        <div
          className="flex flex-col md:justify-between md:flex-row md:items-start w-[90vw] lg:w-[80vw] h-auto rounded-2xl gap-x-2 bg-white p-8"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex w-full md:w-2/5 flex-col justify-center items-stretch relative gap-y-2">
            <WishlistButton
              data={data}
              item={item}
              wishListProduct={wishListProduct}
            />
            <ProductDetails
              data={data}
              amount={amount}
              setAmount={setAmount}
              handleAddToCart={handleAddToCart}
            />
          </div>
          <AddOns
            data={data}
            handleAddOnChange={handleAddOnChange}
            handleRemoveAddOnChange={handleRemoveAddOnChange}
          />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button type="button" onClick={closeModal}>
            close
          </button>
        </form>
      </dialog>
    </div>
  );
};

export default Modal;
