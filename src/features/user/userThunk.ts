import { AxiosResponse } from 'axios';
import { autoFetch } from '../../utils';
import { ApiResponse, ChangePasswordData, EmailVerificationData, ForgetPasswordData, LoginData, RegisterData, ResendOTPData, ResetPasswordData, ValidateOTPData } from '../../assets/types';

// Define a type for the expected structure of response data


export const registerUserThunk = async (
  url: string,
  reqData: RegisterData,
  thunkAPI:any
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
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const loginThunk = async (
  url: string,
  reqData: LoginData,
  thunkAPI: any
): Promise<ApiResponse> => {
  try {
    const response: AxiosResponse<ApiResponse> = await autoFetch.post(
      url,
      reqData
    );
    console.log(response.status);
    return { data: response.data, status: response.status };
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
  thunkAPI: any
): Promise<ApiResponse> => {
  try {
    const response: AxiosResponse<ApiResponse> = await autoFetch.post(
      url,
      reqData
    );
    return response.data;
  } catch (error: any) {
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
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const validateOTPThunk = async (
  url: string,
  reqData: ValidateOTPData,
  thunkAPI: any
): Promise<ApiResponse> => {
  try {
    const response: AxiosResponse<ApiResponse> = await autoFetch.post(
      url,
      reqData
    );
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const resetPasswordThunk = async (
  url: string,
  reqData: ResetPasswordData,
  thunkAPI: any
): Promise<ApiResponse> => {
  try {
    const response: AxiosResponse<ApiResponse> = await autoFetch.post(
      url,
      reqData
    );
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const emailVerificationThunk = async (
  url: string,
  reqData: EmailVerificationData,
  thunkAPI: any
): Promise<ApiResponse> => {
  try {
    const response: AxiosResponse<ApiResponse> = await autoFetch.post(
      url,
      reqData
    );
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const logOutThunk = async (
  url: string,
  thunkAPI: any
): Promise<ApiResponse> => {
  try {
    const response: AxiosResponse<ApiResponse> = await autoFetch.post(url);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};


export const changePasswordThunk = async (
  url: string,
  reqData: ChangePasswordData,
  thunkAPI: any
): Promise<ApiResponse> => {
  try {
    const response: AxiosResponse<ApiResponse> = await autoFetch.put(
      url,
      reqData
    );
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
