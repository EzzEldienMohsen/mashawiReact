import { AxiosResponse } from 'axios';
import { autoFetch } from '../../utils';
import { CartData, MealRequest, MealResponse } from './types';

export const addToCartThunk = async (
  url: string,
  reqData: MealRequest,
  thunkAPI: any
): Promise<MealResponse> => {
  try {
    const response: AxiosResponse<MealResponse> = await autoFetch.post(
      url,
      reqData,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    );
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const editQuantityThunk = async (
  url: string,
  reqData: { qty: number },
  thunkAPI: any
): Promise<MealResponse> => {
  try {
    const response: AxiosResponse<MealResponse> = await autoFetch.post(
      url,
      reqData,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    );
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
export const getTheCartThunk = async (
  url: string,
  thunkAPI: any
): Promise<{ status: number; message: string; data: CartData[] }> => {
  try {
    const response: AxiosResponse<{
      status: number;
      message: string;
      data: CartData[];
    }> = await autoFetch.post(url, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
export const removeItemThunk = async (
  url: string,
  thunkAPI: any
): Promise<{ status: number; message: string; data: null }> => {
  try {
    const response: AxiosResponse<{
      status: number;
      message: string;
      data: null;
    }> = await autoFetch.post(url, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
