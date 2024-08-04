import React from 'react';
import { FaHeart } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';
import {
  addItem as addToWishList,
  removeItem as removeFromWishList,
} from '../features/wishList/wishListSlice';
import { CartItem } from '../assets/types';
import { useGlobalContext } from '../context/GlobalContext';
interface WishlistProps {
  data: CartItem;
  item: CartItem | undefined;
  wishListProduct: CartItem;
}
const WishListButton: React.FC<WishlistProps> = ({
  data,
  item,
  wishListProduct,
}) => {
  const dispatch = useDispatch();
const {isLangArabic} =useGlobalContext()
  const addItemToWishList = (product: CartItem) => {
    dispatch(addToWishList({ product }));
  };

  const removeItemFromWishList = (product: CartItem) => {
    dispatch(removeFromWishList(product));
  };

  return (
    <button
      className={`absolute btn-ghost w-8 h-8 bg-white top-3 ${isLangArabic?"left-4":"right-4"} border-0 flex justify-center items-center rounded-full ${
        item?.id === data.id ? 'text-newRed' : 'text-black'
      } `}
      onClick={() => {
        if (item) {
          removeItemFromWishList(item);
        } else {
          addItemToWishList({ ...wishListProduct });
        }
      }}
    >
      <FaHeart/>
    </button>
  );
};

export default WishListButton;
