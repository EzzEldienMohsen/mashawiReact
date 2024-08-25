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
  language: string,
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
          lang: language,
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
  language: string,
  thunkAPI: any
): Promise<CompleteUSer> => {
  try {
    const response: AxiosResponse<CompleteUSer> = await autoFetch.post(
      url,
      reqData,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          lang: language,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue({
      message: error.response.data,
      status: error.response.status,
    });
  }
};

export const forgetPasswordThunk = async (
  url: string,
  reqData: ForgetPasswordData,
  language: string,
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
          lang: language,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    toast.error(error.response.data.message);
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
};

export const resendOTPThunk = async (
  url: string,
  reqData: ResendOTPData,
  language: string,
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
          lang: language,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    toast.error(error.response.data.message);
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
};

export const validateOTPThunk = async (
  url: string,
  reqData: ValidateOTPData,
  language: string,
  thunkAPI: any
): Promise<ValidateOTPRes> => {
  try {
    const response: AxiosResponse<ValidateOTPRes> = await autoFetch.post(
      url,
      reqData,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          lang: language,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    toast.error(error.response.data.message);
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
};

export const resetPasswordThunk = async (
  url: string,
  reqData: ResetPasswordData,
  language: string,
  thunkAPI: any
): Promise<CompleteUSer> => {
  try {
    const response: AxiosResponse<CompleteUSer> = await autoFetch.post(
      url,
      reqData,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          lang: language,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    toast.error(error.response.data.message);
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
};

export const emailVerificationThunk = async (
  url: string,
  reqData: EmailVerificationData,
  language: string,
  thunkAPI: any
): Promise<CompleteUSer> => {
  try {
    const response: AxiosResponse<CompleteUSer> = await autoFetch.post(
      url,
      reqData,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          lang: language,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    toast.error(error.response.data.message);
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
};

export const logOutThunk = async (
  url: string,
  token: string,
  language: string,
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
          lang: language,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    toast.error(error.response.data.message);
    return thunkAPI.rejectWithValue(error.response.data.message);
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
    return thunkAPI.rejectWithValue(error.response.data.message);
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
    return thunkAPI.rejectWithValue(error.response.data.message);
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
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
};
