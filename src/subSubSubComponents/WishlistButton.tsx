import React from 'react';
import { FaHeart } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';
import {
  addItem as addToWishList,
  removeItem as removeFromWishList,
} from '../features/wishList/wishListSlice';
import { CartItem } from '../assets/types';
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

  const addItemToWishList = (product: CartItem) => {
    dispatch(addToWishList({ product }));
  };

  const removeItemFromWishList = (product: CartItem) => {
    dispatch(removeFromWishList(product));
  };

  return (
    <button
      className={`absolute btn-ghost bg-transparent top-3 left-4 border-0 btn btn-circle ${
        item?.id === data.id ? 'text-newRed' : 'text-black'
      } text-3xl`}
      onClick={() => {
        if (item) {
          removeItemFromWishList(item);
        } else {
          addItemToWishList({ ...wishListProduct });
        }
      }}
    >
      <FaHeart />
    </button>
  );
};

export default WishListButton;
