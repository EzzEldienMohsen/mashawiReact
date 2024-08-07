import { AxiosResponse } from 'axios';
import { autoFetch } from '../../utils';
import { MealRequest, MealResponse } from './types';

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
