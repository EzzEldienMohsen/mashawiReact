import { AxiosResponse } from 'axios';
import { autoFetch } from '../../utils';
import {
  AddToWishListRequest,
  WishListType,
  getWishListResponse,
} from './types';
import { toast } from 'react-toastify';

export const addToWishListThunk = async (
  url: string,
  reqData: AddToWishListRequest,
  thunkAPI: any
): Promise<WishListType> => {
  try {
    const response: AxiosResponse<WishListType> = await autoFetch.post(
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
    toast.error(error.response.data.message);
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
};
export const getWishListThunk = async (
  url: string,
  thunkAPI: any
): Promise<getWishListResponse> => {
  try {
    const response: AxiosResponse<getWishListResponse> = await autoFetch.get(
      url,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    );

    return response.data;
  } catch (error: any) {
    toast.error(error.response.data.message);
    return thunkAPI.rejectWithValue(error.response.data.message);
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
    }> = await autoFetch.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    return response.data;
  } catch (error: any) {
    toast.error(error.response.data.message);
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
};
