import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { CartItem, CartItemWithId, WishListState } from '../../assets/types';
import { AddToWishListRequest, WishListType } from './types';
import {
  addToWishListThunk,
  getWishListThunk,
  removeItemThunk,
} from './wishListThunk';
import { RootState } from '../../store';
import { TFunction } from 'i18next';

const defaultItems: WishListState = {
  wishListItems: [],
  numItemsInWishList: 0,
  isLoading: false,
};

export const addThisToWishList = createAsyncThunk(
  'wishList/addThisToWishList',
  async (
    data: {
      reqData: AddToWishListRequest;
      token: string;
      language: string;
      t: TFunction<'translation', undefined>;
    },
    thunkAPI
  ) => {
    const { reqData, token, language, t } = data;
    return addToWishListThunk(
      '/wishlist/add',
      reqData,
      thunkAPI,
      token,
      language,
      t
    );
  }
);

export const getWishList = createAsyncThunk(
  'wishList/getWishList',
  async (data: { token: string; language: string }, thunkAPI) => {
    const { token, language } = data;
    const response = await getWishListThunk(
      '/wishlist',
      thunkAPI,
      token,
      language
    );
    const localWishListItems = (thunkAPI.getState() as RootState)
      .mashawiWishList.wishListItems;

    const combinedWishListItems = response.data.map((backendItem) => {
      const localItem = localWishListItems.find(
        (item) => item.cartItem.id === backendItem.meal.id
      );

      return localItem
        ? { ...localItem, cart_id: backendItem.wish_id }
        : {
            cart_id: backendItem.wish_id,
            cartItem: {
              name: backendItem.meal.name,
              price: backendItem.meal.price,
              image: backendItem.meal.image,
              id: backendItem.meal.id,
              additions: backendItem.meal.additions,
              amount: 1, // Default amount if not found locally
            },
          };
    });

    return { ...response, data: combinedWishListItems };
  }
);
export const removeMeal = createAsyncThunk(
  'wishList/removeMeal',
  async (
    data: { cart_id: number; token: string; language: string },
    thunkAPI
  ) => {
    const { cart_id, token, language } = data;
    return removeItemThunk(
      `/wishlist/remove/${cart_id}`,
      thunkAPI,
      token,
      language
    );
  }
);
const wishListSlice = createSlice({
  name: 'mashawiWishList',
  initialState: defaultItems,
  reducers: {
    addItem: (state, action: PayloadAction<{ product: CartItem }>) => {
      const { product } = action.payload;
      const existingItem = state.wishListItems.find(
        (item) => item.cartItem.id === product.id
      );
      if (existingItem) {
      } else {
        state.wishListItems.push({ cartItem: product, cart_id: 0 });
        state.numItemsInWishList += 1;
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
        (
          state,
          action: PayloadAction<{
            status: number;
            message: string;
            data: CartItemWithId[];
          }>
        ) => {
          state.isLoading = false;
          state.wishListItems = action.payload.data;
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
