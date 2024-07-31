import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { AddOn, CartItem, CartState } from '../../assets/types';



const defaultState: CartState = {
  cartItems: [],
  numItemsInCart: 0,
  cartTotal: 0,
  shipping: 500,
  tax: 0,
  orderTotal: 0,
};

const calculateProductTotal = (product: CartItem): number => {
  const addOnsTotal = product.addOns.reduce(
    (total, addOn) => total + (addOn.price || 0),
    0
  );
  return product.price * product.amount + addOnsTotal * product.amount;
};

const cartSlice = createSlice({
  name: 'mashawiCart',
  initialState:
    (JSON.parse(localStorage.getItem('mashawiCart')!) as CartState) ||
    defaultState,
  reducers: {
    addItem: (state, action: PayloadAction<{ product: CartItem }>) => {
      const { product } = action.payload;
      const existingItem = state.cartItems.find((i) => i.id === product.id);

      if (existingItem) {
        existingItem.amount += product.amount;
        existingItem.addOns = [...existingItem.addOns, ...product.addOns];
      } else {
        state.cartItems.push(product);
      }

      state.numItemsInCart += product.amount;
      state.cartTotal += calculateProductTotal(product);
      cartSlice.caseReducers.calculateTotals(state);
      toast.success('تم إضافة الوجبة إلى طلباتك بنجاح');
      console.log(state.cartItems);
    },
    clearCart: () => {
      localStorage.setItem('mashawiCart', JSON.stringify(defaultState));
      toast.error('تم ازالة قائمة الطلبات');
      return defaultState;
    },
    removeItem: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      const removedProduct = state.cartItems.find((i) => i.id === id);

      if (removedProduct) {
        state.cartItems = state.cartItems.filter((i) => i.id !== id);
        state.numItemsInCart -= removedProduct.amount;
        state.cartTotal -= calculateProductTotal(removedProduct);
        cartSlice.caseReducers.calculateTotals(state);
        toast.error('تم ازالة الطلب من قائمة الطلبات');
      }
    },
    addAddOns: (
      state,
      action: PayloadAction<{ cartID: string; addOns: AddOn[] }>
    ) => {
      const { cartID, addOns } = action.payload;
      const item = state.cartItems.find((i) => i.id === cartID);

      if (item) {
        item.addOns = [...item.addOns, ...addOns];
        const addOnsTotal = addOns.reduce(
          (total, addOn) => total + (addOn.price || 0),
          0
        );
        state.cartTotal += addOnsTotal * item.amount;
        cartSlice.caseReducers.calculateTotals(state);
        toast.success('تم اضافة الاضافة الي طلبك');
      }
    },
    removeAddOns: (
      state,
      action: PayloadAction<{ cartID: string; addOnIDs: string[] }>
    ) => {
      const { cartID, addOnIDs } = action.payload;
      const item = state.cartItems.find((i) => i.id === cartID);

      if (item) {
        const addOnsToRemove = item.addOns.filter((ao) =>
          addOnIDs.includes(ao.id)
        );
        const addOnsTotal = addOnsToRemove.reduce(
          (total, addOn) => total + (addOn.price || 0),
          0
        );
        item.addOns = item.addOns.filter((ao) => !addOnIDs.includes(ao.id));
        state.cartTotal -= addOnsTotal * item.amount;
        cartSlice.caseReducers.calculateTotals(state);
        toast.error('تم ازالة الاضافة من طلبك');
      }
    },
    calculateTotals: (state) => {
      state.tax = 0.1 * state.cartTotal;
      state.orderTotal = state.cartTotal + state.tax + state.shipping;
      localStorage.setItem('mashawiCart', JSON.stringify(state));
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
