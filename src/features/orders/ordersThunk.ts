import { AxiosResponse } from 'axios';
import {
  ApplyCouponRes,
  CheckoutReq,
  CheckoutResponse,
  GetCalcRes,
  OrdersResponse,
  SingleOrderResponse,
} from './types';
import { autoFetch } from '../../utils';
import { toast } from 'react-toastify';

export const getAllOrdersThunk = async (
  url: string,
  token: string,
  language: string,
  thunkAPI: any
): Promise<OrdersResponse> => {
  try {
    const response: AxiosResponse<OrdersResponse> = await autoFetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        lang: language,
      },
    });
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
export const getSingleOrderThunk = async (
  url: string,
  token: string,
  language: string,
  thunkAPI: any
): Promise<SingleOrderResponse> => {
  try {
    const response: AxiosResponse<SingleOrderResponse> = await autoFetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        lang: language,
      },
    });
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const getTotalsThunk = async (
  url: string,
  token: string,
  language: string,
  thunkAPI: any
): Promise<GetCalcRes> => {
  try {
    const response: AxiosResponse<GetCalcRes> = await autoFetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        lang: language,
      },
    });
    return response.data;
  } catch (error: any) {
    toast.error(error.response.data.message);
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const applyCouponThunk = async (
  url: string,
  reqData: { code: string },
  token: string,
  language: string,
  thunkAPI: any
): Promise<ApplyCouponRes> => {
  try {
    const response: AxiosResponse<ApplyCouponRes> = await autoFetch.post(
      url,
      reqData,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          lang: language,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    toast.error(error.response.data.message);
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
export const checkoutThunk = async (
  url: string,
  reqData: CheckoutReq,
  token: string,
  language: string,
  thunkAPI: any
): Promise<CheckoutResponse> => {
  try {
    const response: AxiosResponse<CheckoutResponse> = await autoFetch.post(
      url,
      reqData,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          lang: language,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
