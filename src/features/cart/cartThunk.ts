import { AxiosResponse } from 'axios';
import { autoFetch } from '../../utils';
import { CartData, MealRequest, MealResponse } from './types';
import { toast } from 'react-toastify';
import { TFunction } from 'i18next';

export const addToCartThunk = async (
  url: string,
  reqData: MealRequest,
  language: string,
  token: string,
  t: TFunction<'translation', undefined>,
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
          Authorization: `Bearer ${token}`,
          lang: language,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    if (error.response.status === 401) {
      toast.warn(t('addToCartMsg'));
    } else {
      toast.error(error.response.data.message);
    }
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
};

export const editQuantityThunk = async (
  url: string,
  reqData: { qty: number },
  token: string,
  language: string,
  t: TFunction<'translation', undefined>,
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
          Authorization: `Bearer ${token}`,
          lang: language,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    if (error.response.status === 401) {
      toast.warn(t('editCartMsg'), { position: 'top-left' });
    } else {
      toast.error(error.response.data.message);
    }
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
};
export const getTheCartThunk = async (
  url: string,
  thunkAPI: any,
  token: string,
  language: string
): Promise<{ status: number; message: string; data: CartData[] }> => {
  try {
    const response: AxiosResponse<{
      status: number;
      message: string;
      data: CartData[];
    }> = await autoFetch.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        lang: language,
      },
    });
    return response.data;
  } catch (error: any) {
    if (error.response.status === 401) {
    } else {
      toast.error(error.response.data.message);
    }
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
};
export const removeItemThunk = async (
  url: string,
  thunkAPI: any,
  language: string,
  token: string
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
        Authorization: `Bearer ${token}`,
        lang: language,
      },
    });
    return response.data;
  } catch (error: any) {
    if (error.response.status === 401) {
    } else {
      toast.error(error.response.data.message);
    }
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
};
