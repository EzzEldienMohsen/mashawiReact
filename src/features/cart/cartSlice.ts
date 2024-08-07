import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { AddOn, CartItem, CartItemWithId, CartState } from '../../assets/types';
import { MealRequest, MealResponse } from './types';
import { addToCartThunk, editQuantityThunk } from './cartThunk';

const defaultState: CartState = {
  cart_id: 0,
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
  async (reqData: MealRequest, thunkAPI) => {
    return addToCartThunk('/cart/add', reqData, thunkAPI);
  }
);
export const editQuantity = createAsyncThunk(
  'theMashawiCart/editQuantity',
  async (reqData: { qty: number }, thunkAPI) => {
    const { cart_id } = thunkAPI.getState() as CartState;
    if (!cart_id) {
      return thunkAPI.rejectWithValue('User is not authenticated');
    }
    return editQuantityThunk('/cart/add', reqData, thunkAPI);
  }
);

const cartSlice = createSlice({
  name: 'theMashawiCart',
  initialState:
    (JSON.parse(localStorage.getItem('theMashawiCart')!) as CartState) ||
    defaultState,
  reducers: {
    addItem: (state, action: PayloadAction<{ product: CartItem }>) => {
      const { product } = action.payload;
      const existingItem = state.cartItems.find(
        (i) => i.cartItem.id === product.id
      );

      if (existingItem) {
        state.numItemsInCart -= existingItem.cartItem.amount; // Subtract the old amount
        existingItem.cartItem.amount = product.amount; // Set the new amount
      } else {
        state.cartItems.push({ cartItem: product, cart_id: 0 });
      }

      state.numItemsInCart += product.amount;
      cartSlice.caseReducers.calculateTotals(state);
      toast.success('تم إضافة الوجبة إلى طلباتك بنجاح');
      console.log('Cart Items after adding:', state.cartItems);
    },
    clearCart: () => {
      localStorage.setItem('theMashawiCart', JSON.stringify(defaultState));
      toast.error('تم ازالة قائمة الطلبات');
      return defaultState;
    },
    removeItem: (state, action: PayloadAction<{ id: number }>) => {
      const { id } = action.payload;
      const removedProduct = state.cartItems.find((i) => i.cartItem.id === id);

      if (removedProduct) {
        state.cartItems = state.cartItems.filter((i) => i.cartItem.id !== id);
        state.numItemsInCart -= removedProduct.cartItem.amount;
        cartSlice.caseReducers.calculateTotals(state);
        toast.error('تم ازالة الطلب من قائمة الطلبات');
        console.log('Cart Items after removing:', state.cartItems);
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
        toast.success('تم اضافة الاضافة الي طلبك');
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
        toast.error('تم ازالة الاضافة من طلبك');
      }
    },
    calculateTotals: (state) => {
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
} = cartSlice.actions;

export default cartSlice.reducer;
