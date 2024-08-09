import React from 'react';
import { FaHeart } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';
import {
  addThisToWishList,
  addItem as addToWishList,
  removeItem as removeFromWishList,
  removeMeal,
} from '../features/wishList/wishListSlice';
import { CartItem, CartItemWithId, SingleMealData } from '../assets/types';
import { useGlobalContext } from '../context/GlobalContext';
import { AppDispatch } from '../store';
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
  const { isLangArabic } = useGlobalContext();
  const addItemToWishList = (product: CartItem, meal_id: number) => {
    dispatch(addToWishList({ product }));
    dispatch(addThisToWishList({ meal_id }));
  };

  const removeItemFromWishList = (product: CartItem, wish_id: number) => {
    dispatch(removeFromWishList(product));
    dispatch(removeMeal({ cart_id: wish_id }));
  };

  return (
    <button
      className={`absolute btn-ghost w-8 h-8 bg-white top-3 ${
        isLangArabic ? 'left-4' : 'right-4'
      } border-0 flex justify-center items-center rounded-full ${
        item?.cartItem.id === data.id ? 'text-newRed' : 'text-black'
      } `}
      onClick={() => {
        if (item) {
          removeItemFromWishList(item.cartItem, item.cart_id);
        } else {
          addItemToWishList(wishListProduct, wishListProduct.id);
        }
      }}
    >
      <FaHeart />
    </button>
  );
};

export default WishListButton;
