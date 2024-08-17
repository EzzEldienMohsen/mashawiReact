import { AxiosResponse } from 'axios';
import { autoFetch } from '../../utils';
import {
  ApiResponse,
  ChangePasswordData,
  CompleteUSer,
  EmailVerificationData,
  ForgetPasswordData,
  LoginData,
  RegisterData,
  ResendOTPData,
  ResetPasswordData,
  ValidateOTPData,
} from '../../assets/types';
import { toast } from 'react-toastify';
import { GetUserResponse, UpdateUserReq, ValidateOTPRes } from './types';

// Define a type for the expected structure of response data

export const registerUserThunk = async (
  url: string,
  reqData: RegisterData,
  thunkAPI: any
): Promise<ApiResponse> => {
  try {
    const response: AxiosResponse<ApiResponse> = await autoFetch.post(
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

export const loginThunk = async (
  url: string,
  reqData: LoginData,
  thunkAPI: any
): Promise<CompleteUSer> => {
  try {
    const response: AxiosResponse<CompleteUSer> = await autoFetch.post(
      url,
      reqData
    );
    return response.data;
  } catch (error: any) {
    if (error.response.status === 403) {
      toast.success(error.response.data.message);
    } else {
      toast.error(error.response.data.message);
    }
    return thunkAPI.rejectWithValue({
      message: error.response.data,
      status: error.response.status,
    });
  }
};

export const forgetPasswordThunk = async (
  url: string,
  reqData: ForgetPasswordData,
  thunkAPI: any
): Promise<ApiResponse> => {
  try {
    const response: AxiosResponse<ApiResponse> = await autoFetch.post(
      url,
      reqData
    );
    return response.data;
  } catch (error: any) {
    toast.error(error.response.data.message);
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const resendOTPThunk = async (
  url: string,
  reqData: ResendOTPData,
  thunkAPI: any
): Promise<ApiResponse> => {
  try {
    const response: AxiosResponse<ApiResponse> = await autoFetch.post(
      url,
      reqData
    );
    return response.data;
  } catch (error: any) {
    toast.error(error.response.data.message);
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const validateOTPThunk = async (
  url: string,
  reqData: ValidateOTPData,
  thunkAPI: any
): Promise<ValidateOTPRes> => {
  try {
    const response: AxiosResponse<ValidateOTPRes> = await autoFetch.post(
      url,
      reqData
    );
    return response.data;
  } catch (error: any) {
    toast.error(error.response.data.message);
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const resetPasswordThunk = async (
  url: string,
  reqData: ResetPasswordData,
  thunkAPI: any
): Promise<CompleteUSer> => {
  try {
    const response: AxiosResponse<CompleteUSer> = await autoFetch.post(
      url,
      reqData
    );
    return response.data;
  } catch (error: any) {
    toast.error(error.response.data.message);
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const emailVerificationThunk = async (
  url: string,
  reqData: EmailVerificationData,
  thunkAPI: any
): Promise<CompleteUSer> => {
  try {
    const response: AxiosResponse<CompleteUSer> = await autoFetch.post(
      url,
      reqData
    );
    return response.data;
  } catch (error: any) {
    toast.error(error.response.data.message);
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const logOutThunk = async (
  url: string,
  token: string,
  thunkAPI: any
): Promise<ApiResponse> => {
  try {
    const response: AxiosResponse<ApiResponse> = await autoFetch.post(
      url,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    toast.error(error.response.data.message);
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const changePasswordThunk = async (
  url: string,
  reqData: ChangePasswordData,
  token: string,
  language: string,
  thunkAPI: any
): Promise<GetUserResponse> => {
  try {
    const response: AxiosResponse<GetUserResponse> = await autoFetch.put(
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
export const getUserThunk = async (
  url: string,
  token: string,
  language: string,
  thunkAPI: any
): Promise<GetUserResponse> => {
  try {
    const response: AxiosResponse<GetUserResponse> = await autoFetch.get(url, {
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
export const updateUserThunk = async (
  url: string,
  reqData: UpdateUserReq,
  token: string,
  language: string,
  thunkAPI: any
): Promise<GetUserResponse> => {
  try {
    const response: AxiosResponse<GetUserResponse> = await autoFetch.put(
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
