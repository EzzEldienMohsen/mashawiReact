import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { CartItem, WishListState } from '../../assets/types';

const defaultItems: WishListState = {
  wishListItems: [],
  numItemsInWishList: 0,
};

const getWishListFromLocalStore = (): WishListState => {
  return JSON.parse(localStorage.getItem('wishList')!) || defaultItems;
};

const wishListSlice = createSlice({
  name: 'wishList',
  initialState: getWishListFromLocalStore(),
  reducers: {
    addItem: (state, action: PayloadAction<{ product: CartItem }>) => {
      const { product } = action.payload;
      const existingItem = state.wishListItems.find(
        (item) => item.id === product.id
      );
      if (existingItem) {
        toast.success('الطلب موجود في المفضلة بالفعل');
      } else {
        state.wishListItems.push(product);
        state.numItemsInWishList += 1;
        toast.success('تم اضافة الطلب الي المفضلة');
      }
      localStorage.setItem('wishList', JSON.stringify(state));
    },
    clearWishList: () => {
      localStorage.setItem('wishList', JSON.stringify(defaultItems));
      return defaultItems;
    },
    removeItem: (state, action: PayloadAction<{ id: number }>) => {
      const { id } = action.payload;
      state.wishListItems = state.wishListItems.filter(
        (item) => item.id !== id
      );
      state.numItemsInWishList -= 1;
      toast.error('تم ازالة الطلب من المفضلة');
      localStorage.setItem('wishList', JSON.stringify(state));
    },
  },
});

export const { addItem, removeItem, clearWishList } = wishListSlice.actions;
export default wishListSlice.reducer;
