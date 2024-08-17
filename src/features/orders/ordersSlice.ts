import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getOrdersFromLocalStorage } from '../../utils';
import {
  ApplyCouponRes,
  CheckoutReq,
  CheckoutResponse,
  GetCalcRes,
  OrderCalc,
  OrdersResponse,
  OrdersState,
  SingleOrderResponse,
} from './types';
import {
  applyCouponThunk,
  checkoutThunk,
  getAllOrdersThunk,
  getSingleOrderThunk,
  getTotalsThunk,
} from './ordersThunk';
import { toast } from 'react-toastify';

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
const initialCalc: OrderCalc = {
  sub_total: '',
  vat_percent: '',
  vat: '',
  total: '',
};
const initialState: OrdersState = {
  isLoading: false,
  orders: initialOrders,
  singleOrder: initialSingleOrder,
  orderTotal: initialCalc,
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
  async (
    data: { id: string | undefined; token: string; language: string },
    thunkAPI
  ) => {
    const { id, token, language } = data;
    return getSingleOrderThunk(`orders/${id}`, token, language, thunkAPI);
  }
);
export const getTotals = createAsyncThunk(
  'orders/getTotals',
  async (data: { token: string; language: string }, thunkAPI) => {
    const { token, language } = data;
    return getTotalsThunk(`/orders/get-checkout`, token, language, thunkAPI);
  }
);
export const applyCoupon = createAsyncThunk(
  'orders/applyCoupon',
  async (
    data: { reqData: { code: string }; token: string; language: string },
    thunkAPI
  ) => {
    const { reqData, token, language } = data;
    return applyCouponThunk(
      `/orders/apply-coupon`,
      reqData,
      token,
      language,
      thunkAPI
    );
  }
);
export const checkout = createAsyncThunk(
  'orders/checkout',
  async (
    data: { reqData: CheckoutReq; token: string; language: string },
    thunkAPI
  ) => {
    const { reqData, token, language } = data;
    return checkoutThunk(
      `/orders/checkout`,
      reqData,
      token,
      language,
      thunkAPI
    );
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
      })
      .addCase(getTotals.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getTotals.fulfilled,
        (state, action: PayloadAction<GetCalcRes>) => {
          state.isLoading = false;
          state.orderTotal = action.payload.data;
        }
      )
      .addCase(getTotals.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(applyCoupon.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(
        applyCoupon.fulfilled,
        (state, action: PayloadAction<ApplyCouponRes>) => {
          state.isLoading = false;
          state.orderTotal.total_before = action.payload.data.total_before;
          state.orderTotal.total_after = action.payload.data.total_after;
          state.orderTotal.discount = action.payload.data.discount;
          const message = action.payload.message;
          if (action.payload.status === 0) {
            toast.error(message);
          } else {
            toast.success(message);
          }
        }
      )
      .addCase(applyCoupon.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(checkout.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(
        checkout.fulfilled,
        (state, action: PayloadAction<CheckoutResponse>) => {
          state.isLoading = false;
          state.orders.push(action.payload.data);
          const message = action.payload.message;
          toast.success(message);
        }
      )
      .addCase(checkout.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { clearOrders } = ordersSlice.actions;
export default ordersSlice.reducer;
