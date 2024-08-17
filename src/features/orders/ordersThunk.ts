import { AxiosResponse } from 'axios';
import { OrdersResponse, SingleOrderResponse } from './types';
import { autoFetch } from '../../utils';

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
    console.log(response);
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
