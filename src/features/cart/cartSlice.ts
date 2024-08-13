import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { AddOn, CartItem, CartItemWithId, CartState } from '../../assets/types';
import { MealRequest, MealResponse } from './types';
import {
  addToCartThunk,
  editQuantityThunk,
  getTheCartThunk,
  removeItemThunk,
} from './cartThunk';
import { RootState } from '../../store';

const defaultState: CartState = {
  isLoading: false,
  cartItems: [],
  numItemsInCart: 0,
  cartTotal: 0,
  shipping: 5,
  tax: 0,
  orderTotal: 0,
};

const calculateProductTotal = (product: CartItemWithId): number => {
  return product.cartItem.price * product.cartItem.amount;
};
// Restful api
export const addThisItemToCart = createAsyncThunk(
  'theMashawiCart/addThisItemToCart',
  async (
    reqData: { data: MealRequest; token: string; language: string },
    thunkAPI
  ) => {
    return addToCartThunk(
      '/cart/add',
      reqData.data,
      reqData.language,
      reqData.token,
      thunkAPI
    );
  }
);
export const editQuantity = createAsyncThunk(
  'theMashawiCart/editQuantity',
  async (
    data: {
      reqData: { qty: number };
      cart_id: number;
      token: string;
      language: string;
    },
    thunkAPI
  ) => {
    const { cart_id, reqData, token, language } = data;
    return editQuantityThunk(
      `/cart/change-qty/${cart_id}`,
      reqData,
      token,
      language,
      thunkAPI
    );
  }
);
export const removeMeal = createAsyncThunk(
  'theMashawiCart/removeMeal',
  async (
    data: { cart_id: number; token: string; language: string },
    thunkAPI
  ) => {
    const { cart_id, token, language } = data;
    return removeItemThunk(
      `/cart/remove/${cart_id}`,
      thunkAPI, // This should be passed here
      language,
      token // Token should be passed last
    );
  }
);

export const getCart = createAsyncThunk(
  'theMashawiCart/getCart',
  async (
    { token, language }: { token: string; language: string },
    thunkAPI
  ) => {
    const state = thunkAPI.getState() as RootState;

    if (token) {
      const response = await getTheCartThunk(
        '/cart',
        thunkAPI,
        token,
        language
      );
      const combinedCartItems = response.data.map((backendItem) => {
        const localItem = state.theMashawiCart.cartItems.find(
          (item) => item.cartItem.id === backendItem.meal.id
        );

        return localItem
          ? { ...localItem, cart_id: backendItem.cart_id }
          : {
              cart_id: backendItem.cart_id,
              cartItem: {
                name: backendItem.meal.name,
                price: backendItem.meal.price,
                image: backendItem.meal.image,
                id: backendItem.meal.id,
                additions: backendItem.meal.additions,
                amount: backendItem.qty,
              },
            };
      });

      return { ...response, data: combinedCartItems };
    } else {
      // Load cart from local storage if no user is logged in
      const localCart = JSON.parse(
        localStorage.getItem('theMashawiCart') || '[]'
      );
      return {
        status: 200,
        message: 'Cart loaded from local storage',
        data: localCart,
      };
    }
  }
);

const cartSlice = createSlice({
  name: 'theMashawiCart',
  initialState: defaultState,
  reducers: {
    addItem: (state, action: PayloadAction<{ product: CartItem }>) => {
      const { product } = action.payload;
      const existingItem = state.cartItems.find(
        (i) => i.cartItem.id === product.id
      );

      if (existingItem) {
        state.numItemsInCart -= existingItem.cartItem.amount; // Subtract the old amount
        existingItem.cartItem.amount = product.amount; // Set the new amount
        existingItem.cartItem.additions = product.additions;
      } else {
        state.cartItems.push({
          cartItem: product,
          cart_id: 0,
        });
      }

      state.numItemsInCart += product.amount;
      cartSlice.caseReducers.calculateTotals(state);
    },
    clearCart: () => {
      localStorage.setItem('theMashawiCart', JSON.stringify(defaultState));
      return defaultState;
    },
    removeItem: (state, action: PayloadAction<{ id: number }>) => {
      const { id } = action.payload;
      const removedProduct = state.cartItems.find((i) => i.cartItem.id === id);

      if (removedProduct) {
        state.cartItems = state.cartItems.filter((i) => i.cartItem.id !== id);
        state.numItemsInCart -= removedProduct.cartItem.amount;
        cartSlice.caseReducers.calculateTotals(state);
      }
    },
    addAddOns: (
      state,
      action: PayloadAction<{ cartID: number; additions: AddOn[] }>
    ) => {
      const { cartID, additions } = action.payload;
      const item = state.cartItems.find((i) => i.cartItem.id === cartID);

      if (item) {
        const newAddOns = additions.filter(
          (additions) =>
            !item.cartItem.additions.some(
              (existingAddOn) => existingAddOn.id === additions.id
            )
        );

        item.cartItem.additions = [...item.cartItem.additions, ...newAddOns];
        cartSlice.caseReducers.calculateTotals(state);
      }
    },
    removeAddOns: (
      state,
      action: PayloadAction<{ cartID: number; addOnIDs: number[] }>
    ) => {
      const { cartID, addOnIDs } = action.payload;
      const item = state.cartItems.find((i) => i.cartItem.id === cartID);

      if (item) {
        item.cartItem.additions = item.cartItem.additions.filter(
          (ao) => !addOnIDs.includes(ao.id)
        );
        cartSlice.caseReducers.calculateTotals(state);
      }
    },
    editQuantityLocally: (
      state,
      action: PayloadAction<{ cartID: number; qty: number }>
    ) => {
      const { cartID, qty } = action.payload;
      const item = state.cartItems.find((i) => i.cartItem.id === cartID);

      if (item) {
        // Subtract the old amount from the total number of items in the cart
        state.numItemsInCart -= item.cartItem.amount;

        if (qty > 0) {
          // Update the item's quantity in the cart
          item.cartItem.amount = qty;
          // Add the new amount to the total number of items in the cart
          state.numItemsInCart += qty;
        } else {
          // Remove the item if the quantity is zero or less
          state.cartItems = state.cartItems.filter(
            (i) => i.cartItem.id !== cartID
          );
        }

        // Recalculate the totals
        cartSlice.caseReducers.calculateTotals(state);
      }
    },

    calculateTotals: (state) => {
      if (!Array.isArray(state.cartItems)) {
        state.cartItems = [];
      }
      state.cartTotal = state.cartItems.reduce((total, item) => {
        return total + calculateProductTotal(item);
      }, 0);
      state.tax = 0.05 * state.cartTotal;
      state.orderTotal = state.cartTotal + state.tax;
      localStorage.setItem('theMashawiCart', JSON.stringify(state));
      console.log('Total calculated:', state.cartTotal);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addThisItemToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        addThisItemToCart.fulfilled,
        (state, action: PayloadAction<MealResponse>) => {
          state.isLoading = false;
          const message = action.payload.message;
          const item = state.cartItems.find(
            (i) => i.cartItem.id === action.payload.data.meal.id
          );
          if (item) item.cart_id = action.payload.data.cart_id;

          toast.success(message);
        }
      )
      .addCase(addThisItemToCart.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(editQuantity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        editQuantity.fulfilled,
        (state, action: PayloadAction<MealResponse>) => {
          state.isLoading = false;
          const message = action.payload.message;
          const item = state.cartItems.find(
            (i) => i.cartItem.id === action.payload.data.meal.id
          );
          if (item) item.cartItem.amount = action.payload.data.qty;

          toast.success(message);
        }
      )
      .addCase(editQuantity.rejected, (state) => {
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
      })
      .addCase(getCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getCart.fulfilled,
        (
          state,
          action: PayloadAction<{
            status: number;
            message: string;
            data: CartItemWithId[];
          }>
        ) => {
          state.isLoading = false;
          state.cartItems = action.payload.data;
          cartSlice.caseReducers.calculateTotals(state);
        }
      )
      .addCase(getCart.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const {
  addItem,
  clearCart,
  removeItem,
  addAddOns,
  removeAddOns,
  calculateTotals,
  editQuantityLocally,
} = cartSlice.actions;

export default cartSlice.reducer;
