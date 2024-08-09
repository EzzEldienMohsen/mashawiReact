import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { CartItem, WishListState } from '../../assets/types';
import {
  AddToWishListRequest,
  getWishListResponse,
  WishListType,
} from './types';
import {
  addToWishListThunk,
  getWishListThunk,
  removeItemThunk,
} from './wishListThunk';

const defaultItems: WishListState = {
  wishListItems: [],
  numItemsInWishList: 0,
  isLoading: false,
};

const getWishListFromLocalStore = (): WishListState => {
  return JSON.parse(localStorage.getItem('wishList')!) || defaultItems;
};

export const addThisToWishList = createAsyncThunk(
  'wishList/addThisToWishList',
  async (reqData: AddToWishListRequest, thunkAPI) => {
    return addToWishListThunk('/wishlist/add', reqData, thunkAPI);
  }
);
export const getWishList = createAsyncThunk(
  'wishList/getWishList',
  async (thunkAPI) => {
    return getWishListThunk('/wishlist', thunkAPI);
  }
);
export const removeMeal = createAsyncThunk(
  'wishList/removeMeal',
  async (data: { cart_id: number }, thunkAPI) => {
    const { cart_id } = data;
    return removeItemThunk(`/wishlist/remove/${cart_id}`, thunkAPI);
  }
);
const wishListSlice = createSlice({
  name: 'wishList',
  initialState: getWishListFromLocalStore(),
  reducers: {
    addItem: (state, action: PayloadAction<{ product: CartItem }>) => {
      const { product } = action.payload;
      const existingItem = state.wishListItems.find(
        (item) => item.cartItem.id === product.id
      );
      if (existingItem) {
        toast.success('الطلب موجود في المفضلة بالفعل');
      } else {
        state.wishListItems.push({ cartItem: product, cart_id: 0 });
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
        (item) => item.cartItem.id !== id
      );
      state.numItemsInWishList -= 1;
      toast.error('تم ازالة الطلب من المفضلة');
      localStorage.setItem('wishList', JSON.stringify(state));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addThisToWishList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        addThisToWishList.fulfilled,
        (state, action: PayloadAction<WishListType>) => {
          state.isLoading = false;
          const message = action.payload.message;
          const item = state.wishListItems.find(
            (i) => i.cartItem.id === action.payload.data.meal.id
          );
          if (item) item.cart_id = action.payload.data.wish_id;

          toast.success(message);
        }
      )
      .addCase(addThisToWishList.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getWishList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getWishList.fulfilled,
        (state, action: PayloadAction<getWishListResponse>) => {
          state.isLoading = false;
          const message = action.payload.message;
          state.wishListItems = action.payload.data.map((item) => ({
            cart_id: item.wish_id,
            cartItem: {
              name: item.meal.name,
              price: item.meal.price,
              image: item.meal.image,
              id: item.meal.id,
              additions: item.meal.additions,
              amount:
                state.wishListItems.find(
                  (existingItem) => existingItem.cartItem.id === item.meal.id
                )?.cartItem.amount || 1,
            },
          }));

          toast.success(message);
        }
      )
      .addCase(getWishList.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(removeMeal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        removeMeal.fulfilled,
        (
          state,
          action: PayloadAction<{ status: number; message: string; data: null }>
        ) => {
          state.isLoading = false;
          const message = action.payload.message;
          toast.success(message);
        }
      )
      .addCase(removeMeal.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { addItem, removeItem, clearWishList } = wishListSlice.actions;
export default wishListSlice.reducer;
