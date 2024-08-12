import { AxiosResponse } from 'axios';
import { autoFetch } from '../../utils';
import {
  CreateAddressReq,
  CreateAddressResponse,
  GetAddressResponse,
  RemoveAddressRes,
} from './types';
import { toast } from 'react-toastify';

export const getAddressThunk = async (
  url: string,
  token: string,
  language: string,
  thunkAPI: any
): Promise<GetAddressResponse> => {
  try {
    const response: AxiosResponse<GetAddressResponse> = await autoFetch.get(
      url,
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

export const createAddressThunk = async (
  url: string,
  reqData: CreateAddressReq,
  token: string,
  language: string,
  thunkAPI: any
): Promise<CreateAddressResponse> => {
  try {
    const response: AxiosResponse<CreateAddressResponse> = await autoFetch.post(
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
export const updateAddressThunk = async (
  url: string,
  reqData: CreateAddressReq,
  token: string,
  language: string,
  thunkAPI: any
): Promise<CreateAddressResponse> => {
  try {
    const response: AxiosResponse<CreateAddressResponse> = await autoFetch.post(
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
export const deleteAddressThunk = async (
  url: string,
  token: string,
  language: string,
  thunkAPI: any
): Promise<RemoveAddressRes> => {
  try {
    const response: AxiosResponse<RemoveAddressRes> = await autoFetch.get(url, {
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
