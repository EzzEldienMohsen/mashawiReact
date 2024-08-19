import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  addItem,
  addThisToWishList,
  getWishList,
  removeItem,
  removeMeal,
} from '../features/wishList/wishListSlice';
import { CartItem, CartItemWithId, SingleMealData } from '../assets/types';
import { useGlobalContext } from '../context/GlobalContext';
import { AppDispatch, RootState, useTypedSelector } from '../store';
import { useTranslation } from 'react-i18next';
import add from '../assets/svg/wishList/add.svg';
import added from '../assets/svg/wishList/added.svg';

interface WishlistProps {
  data: SingleMealData;
  item: CartItemWithId | undefined;
  wishListProduct: CartItem;
}

const WishListButton: React.FC<WishlistProps> = ({
  data,
  item,
  wishListProduct,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const { t } = useTranslation();
  const { isLangArabic } = useGlobalContext();
  const language = isLangArabic ? 'ar' : 'en';
  const { user } = useTypedSelector((state: RootState) => state.user);
  const token = user.token;
  const [isLoading, setIsLoading] = useState(false);

  const addItemToWishList = async (product: CartItem, meal_id: number) => {
    setIsLoading(true);
    await dispatch(addItem({ product }));
    await dispatch(
      addThisToWishList({ reqData: { meal_id }, token, language, t })
    );
    await dispatch(getWishList({ token, language }));
    setIsLoading(false);
  };

  const removeItemFromWishList = async (wish_id: number) => {
    setIsLoading(true);
    await dispatch(removeItem({ id: wish_id }));
    await dispatch(removeMeal({ cart_id: wish_id, token, language }));
    await dispatch(getWishList({ token, language }));
    setIsLoading(false);
  };

  return (
    <button
      className={`absolute btn-ghost w-8 h-8 bg-white top-3 ${
        isLangArabic ? 'left-4' : 'right-4'
      } border-0 flex justify-center items-center rounded-full  ${
        isLoading ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      onClick={async () => {
        if (item) {
          await removeItemFromWishList(item.cartItem.id);
        } else {
          await addItemToWishList(wishListProduct, wishListProduct.id);
        }
      }}
      disabled={isLoading}
    >
      <img src={item?.cartItem.id === data.id ? added : add} alt="heart" />
    </button>
  );
};

export default WishListButton;
