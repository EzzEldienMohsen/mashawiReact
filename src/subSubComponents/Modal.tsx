import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import src from '../assets/svg/menu/addOns.svg';
import { useTranslation } from 'react-i18next';
import { addThisItemToCart } from '../features/cart/cartSlice';
import {
  AddOn,
  CartItem,
  CartItemWithId,
  SingleMealData,
} from '../assets/types';
import { AppDispatch, RootState, useTypedSelector } from '../store';
import { AddOns, ProductDetails, WishlistButton } from '../subSubSubComponents';
import { addItem as addToCart } from '../features/cart/cartSlice';
import { useGlobalContext } from '../context/GlobalContext';

interface ModalProps {
  modalId: string;
  theAmount: number;
  data: SingleMealData;
}

const Modal: React.FC<ModalProps> = ({ data, theAmount, modalId }) => {
  const [amount, setAmount] = React.useState<number>(theAmount);
  const [selectedAddOns, setSelectedAddOns] = React.useState<AddOn[]>([]);
  const dispatch: AppDispatch = useDispatch();
  const { wishListItems } = useTypedSelector(
    (state: RootState) => state.wishList
  );
  const item = wishListItems.find(
    (i: CartItemWithId) => i.cartItem.id === data.id
  );
  const { t } = useTranslation();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { user } = useTypedSelector((state: RootState) => state.user);
  const { isLangArabic } = useGlobalContext();
  const token = user.token;
  const language = isLangArabic ? 'ar' : 'en';
  const handleAddOnChange = (addOn: AddOn, isChecked: boolean): void => {
    setSelectedAddOns((prevAddOns) =>
      isChecked
        ? [...prevAddOns, addOn]
        : prevAddOns.filter((ao) => ao.id !== addOn.id)
    );
  };

  const handleAddToCart = () => {
    const combinedAddOns = [...selectedAddOns];

    const cartProduct: CartItem = {
      id: data.id,
      name: data.name,
      price: data.price,
      image: data.image,
      amount: amount,
      additions: combinedAddOns,
    };

    dispatch(addToCart({ product: cartProduct }));
    dispatch(
      addThisItemToCart({
        language: language,
        token: token,
        data: {
          meal_id: data.id,
          qty: amount,
          additions: cartProduct.additions.flatMap((item) =>
            item.values.map((value) => ({
              id: item.id,
              value: value.id,
            }))
          ),
        },
        t,
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
        className="btn bg-newRed text-white font-abdo font-thin text-xs md:text-sm flex-row flex justify-evenly w-full items-center px-5 lg:px-3 rounded-full py-1"
        onClick={() => dialogRef.current?.showModal()}
      >
        <img src={src} alt="alt" className="w-1/4 lg:w-1/4" />
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
          <AddOns data={data} handleAddOnChange={handleAddOnChange} />
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
