import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { AddOn, CartItem, CartState } from '../../assets/types';

const defaultState: CartState = {
  cartItems: [],
  numItemsInCart: 0,
  cartTotal: 0,
  shipping: 5,
  tax: 0,
  orderTotal: 0,
};

const calculateProductTotal = (product: CartItem): number => {
  return product.price * product.amount;
};

const cartSlice = createSlice({
  name: 'theMashawiCart',
  initialState:
    (JSON.parse(localStorage.getItem('theMashawiCart')!) as CartState) ||
    defaultState,
  reducers: {
    addItem: (state, action: PayloadAction<{ product: CartItem }>) => {
      const { product } = action.payload;
      const existingItem = state.cartItems.find((i) => i.id === product.id);

      if (existingItem) {
        state.numItemsInCart -= existingItem.amount; // Subtract the old amount
        existingItem.amount = product.amount; // Set the new amount
      } else {
        state.cartItems.push(product);
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
      const removedProduct = state.cartItems.find((i) => i.id === id);

      if (removedProduct) {
        state.cartItems = state.cartItems.filter((i) => i.id !== id);
        state.numItemsInCart -= removedProduct.amount;
        cartSlice.caseReducers.calculateTotals(state);
        toast.error('تم ازالة الطلب من قائمة الطلبات');
        console.log('Cart Items after removing:', state.cartItems);
      }
    },
    addAddOns: (
      state,
      action: PayloadAction<{ cartID: number; addOns: AddOn[] }>
    ) => {
      const { cartID, addOns } = action.payload;
      const item = state.cartItems.find((i) => i.id === cartID);

      if (item) {
        const newAddOns = addOns.filter(
          (addOn) =>
            !item.addOns.some((existingAddOn) => existingAddOn.id === addOn.id)
        );

        item.addOns = [...item.addOns, ...newAddOns];
        cartSlice.caseReducers.calculateTotals(state);
        toast.success('تم اضافة الاضافة الي طلبك');
      }
    },
    removeAddOns: (
      state,
      action: PayloadAction<{ cartID: number; addOnIDs: number[] }>
    ) => {
      const { cartID, addOnIDs } = action.payload;
      const item = state.cartItems.find((i) => i.id === cartID);

      if (item) {
        item.addOns = item.addOns.filter((ao) => !addOnIDs.includes(ao.id));
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
