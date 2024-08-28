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
import { AddOns, ProductDetails } from '../subSubSubComponents';
import { addItem as addToCart } from '../features/cart/cartSlice';
import { useGlobalContext } from '../context/GlobalContext';

interface ModalProps {
  modalId: string;
  data: SingleMealData;
}

const Modal: React.FC<ModalProps> = ({ data, modalId }) => {
  const [selectedAddOns, setSelectedAddOns] = React.useState<AddOn[]>([]);
  const dispatch: AppDispatch = useDispatch();
  const { wishListItems } = useTypedSelector(
    (state: RootState) => state.mashawiWishList
  );

  const item = wishListItems.find(
    (i: CartItemWithId) => i.cartItem.id === data.id
  );
  const { t } = useTranslation();
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
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { user } = useTypedSelector((state: RootState) => state.user);
  const { isLangArabic } = useGlobalContext();
  const token = user.token;
  const language = isLangArabic ? 'ar' : 'en';
  const handleAddOnChange = (
    addOn: AddOn,
    selectedValues: { id: number; name: string; price: string }[]
  ) => {
    setSelectedAddOns((prevAddOns) => {
      // Find if the add-on already exists
      const existingAddOnIndex = prevAddOns.findIndex(
        (ao) => ao.id === addOn.id
      );

      if (existingAddOnIndex > -1) {
        // If it exists, update its values
        const updatedAddOns = [...prevAddOns];
        updatedAddOns[existingAddOnIndex] = {
          ...updatedAddOns[existingAddOnIndex],
          values: selectedValues,
        };
        return updatedAddOns;
      } else {
        // If it doesn't exist, add it to the array
        return [...prevAddOns, { ...addOn, values: selectedValues }];
      }
    });
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
          additions: selectedAddOns.flatMap((item) =>
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
    <div className="w-full">
      <button
        className="btn bg-newRed text-white font-abdo h-auto min-h-[46px] font-thin text-[10px] md:text-[16px]  flex flex-row justify-evenly w-4/5 lg:w-[90%] 2xl:w-5/6  items-center 2xl:justify-evenly px-2  md:px-5 rounded-full py-1 2xl:py-4"
        onClick={() => dialogRef.current?.showModal()}
      >
        <img
          src={src}
          alt="alt"
          className="w-1/4 md:w-auto lg:w-1/4 2xl:w-auto"
        />
        <span className="text-[10px] md:text-[16px] font-abdo">
          {t('addOnsText')}
        </span>
      </button>

      <dialog
        ref={dialogRef}
        id={modalId}
        className="modal overflow-y-auto mr-5 w-full  flex justify-center items-center "
        onClick={handleClickOutside}
      >
        <div
          className="flex flex-col md:justify-between lg:flex-row lg:items-start w-[90vw] lg:w-[80vw] h-4/5 md:h-auto overflow-y-auto rounded-2xl gap-x-2 bg-white p-8"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex w-full md:w-full lg:w-2/5 flex-col justify-center items-stretch  gap-y-2">
            <ProductDetails
              data={data}
              amount={amount}
              setAmount={setAmount}
              handleAddToCart={handleAddToCart}
              item={item}
              wishListProduct={wishListProduct}
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
