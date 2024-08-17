import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getOrdersFromLocalStorage } from '../../utils';
import { OrdersResponse, OrdersState, SingleOrderResponse } from './types';
import { getAllOrdersThunk, getSingleOrderThunk } from './ordersThunk';

const initialOrders = getOrdersFromLocalStorage() || [];
const initialSingleOrder = {
  status: 1,
  message: '',
  data: {
    id: 0,
    status: '',
    meals: [],
    address: '',
    branch: '',
    calculations: {
      subtotal: '',
      vat: '',
      discount: '',
      total: '',
    },
  },
};

const initialState: OrdersState = {
  isLoading: false,
  orders: initialOrders,
  singleOrder: initialSingleOrder,
};
export const getAllOrders = createAsyncThunk(
  'orders/getAllOrders',
  async (data: { token: string; language: string }, thunkAPI) => {
    const { token, language } = data;
    return getAllOrdersThunk('orders/history', token, language, thunkAPI);
  }
);
export const getSingleOrder = createAsyncThunk(
  'orders/getSingleOrder',
  async (data: { id: string; token: string; language: string }, thunkAPI) => {
    const { id, token, language } = data;
    return getSingleOrderThunk(`orders/${id}`, token, language, thunkAPI);
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearOrders: (state) => {
      state.orders = [];
      state.singleOrder = initialSingleOrder;
      localStorage.removeItem('orders');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getAllOrders.fulfilled,
        (state, action: PayloadAction<OrdersResponse>) => {
          state.isLoading = false;
          state.orders = action.payload.data;
          localStorage.setItem('orders', JSON.stringify(state.orders));
        }
      )
      .addCase(getAllOrders.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getSingleOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getSingleOrder.fulfilled,
        (state, action: PayloadAction<SingleOrderResponse>) => {
          state.isLoading = false;
          state.singleOrder = action.payload;
        }
      )
      .addCase(getSingleOrder.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { clearOrders } = ordersSlice.actions;
export default ordersSlice.reducer;
