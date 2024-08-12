import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  emailVerificationThunk,
  forgetPasswordThunk,
  loginThunk,
  registerUserThunk,
  resendOTPThunk,
  resetPasswordThunk,
  validateOTPThunk,
  logOutThunk,
  changePasswordThunk,
  getUserThunk,
  updateUserThunk,
} from './userThunk';
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from '../../utils';
import { toast } from 'react-toastify';
import {
  ChangePasswordData,
  CompleteUSer,
  EmailVerificationData,
  ForgetPasswordData,
  LoginData,
  RegisterData,
  ResendOTPData,
  ResetPasswordData,
  User,
  UserState,
  ValidateOTPData,
} from '../../assets/types';
import { GetUserResponse, UpdateUserReq, ValidateOTPRes } from './types';

const initialUser: User = getUserFromLocalStorage() || {
  token: '',
  user: {
    id: 0,
    f_name: '',
    l_name: '',
    phone: '',
    email: '',
    birthdate: '',
    gender: '',
    nationality: '',
    work: '',
  },
};
const initialState: UserState = {
  isLoading: false,
  isSidebarOpen: false,
  user: initialUser,
};

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (reqData: RegisterData, thunkAPI) => {
    return registerUserThunk('/auth/register', reqData, thunkAPI);
  }
);
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (reqData: LoginData, thunkAPI) => {
    return loginThunk('/auth/login', reqData, thunkAPI);
  }
);
export const forgetPassword = createAsyncThunk(
  'user/forgetPassword',
  async (reqData: ForgetPasswordData, thunkAPI) => {
    return forgetPasswordThunk('/auth/forget-password', reqData, thunkAPI);
  }
);
export const emailVerification = createAsyncThunk(
  'user/emailVerification',
  async (reqData: EmailVerificationData, thunkAPI) => {
    return emailVerificationThunk('/auth/verify-email', reqData, thunkAPI);
  }
);
export const resendOTP = createAsyncThunk(
  'user/resendOTP',
  async (reqData: ResendOTPData, thunkAPI) => {
    return resendOTPThunk('/auth/resend-otp', reqData, thunkAPI);
  }
);
export const validateOTP = createAsyncThunk(
  'user/validateOTP',
  async (reqData: ValidateOTPData, thunkAPI) => {
    return validateOTPThunk('/auth/validate-otp', reqData, thunkAPI);
  }
);
export const resetPassword = createAsyncThunk(
  'user/resetPassword',
  async (reqData: ResetPasswordData, thunkAPI) => {
    const { user } = thunkAPI.getState() as { user: UserState };
    if (!user || !user.user) {
      return thunkAPI.rejectWithValue('User is not authenticated');
    }
    return resetPasswordThunk(
      '/auth/reset-password',
      { ...reqData, token: user.user.token },
      thunkAPI
    );
  }
);
export const logOut = createAsyncThunk(
  'user/logOut',
  async (token: string, thunkAPI) => {
    return logOutThunk('/auth/logout', token, thunkAPI);
  }
);

export const changePassword = createAsyncThunk(
  'user/changePassword',
  async (
    data: { reqData: ChangePasswordData; token: string; language: string },
    thunkAPI
  ) => {
    const { reqData, token, language } = data;
    return changePasswordThunk(
      '/user/change-password',
      reqData,
      token,
      language,
      thunkAPI
    );
  }
);

export const getUser = createAsyncThunk(
  'user/getUser',
  async (data: { token: string; language: string }, thunkAPI) => {
    const { token, language } = data;
    return getUserThunk('/user/profile', token, language, thunkAPI);
  }
);
export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (
    data: { reqData: UpdateUserReq; token: string; language: string },
    thunkAPI
  ) => {
    const { reqData, token, language } = data;
    return updateUserThunk('/user/profile', reqData, token, language, thunkAPI);
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user.token = '';
      state.user = initialUser;
      state.isSidebarOpen = false;
      removeUserFromLocalStorage();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        const message = action.payload.message;
        toast.success(message);
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<CompleteUSer>) => {
          state.isLoading = false;
          state.isSidebarOpen = true;
          const user = action.payload.data;
          state.user = user;
          addUserToLocalStorage(user);
          const message = action.payload.message;
          toast.success(message);
        }
      )
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getUser.fulfilled,
        (state, action: PayloadAction<GetUserResponse>) => {
          state.isLoading = false;
          state.isSidebarOpen = true;
          const user = action.payload.data;
          state.user.user = user;

          addUserToLocalStorage(state.user);
        }
      )
      .addCase(getUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        updateUser.fulfilled,
        (state, action: PayloadAction<GetUserResponse>) => {
          state.isLoading = false;
          state.isSidebarOpen = true;
          const user = action.payload.data;
          state.user.user = user;
          addUserToLocalStorage(state.user);
        }
      )
      .addCase(updateUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(forgetPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        forgetPassword.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          const message = action.payload.message;
          toast.success(message);
        }
      )
      .addCase(changePassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        changePassword.fulfilled,
        (state, action: PayloadAction<GetUserResponse>) => {
          state.isLoading = false;
          const message = action.payload.message;
          state.user.user = action.payload.data;
          toast.success(message);
          addUserToLocalStorage(state.user);
        }
      )
      .addCase(changePassword.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(validateOTP.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        validateOTP.fulfilled,
        (state, action: PayloadAction<ValidateOTPRes>) => {
          state.isLoading = false;
          state.user.token = action.payload.data.temp_token;
          const message = action.payload.message;
          toast.success(message);
        }
      )
      .addCase(validateOTP.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        const message = action.payload.message;
        toast.success(message);
      })
      .addCase(resetPassword.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(emailVerification.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        emailVerification.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          const message = action.payload.message;
          toast.success(message);
        }
      )
      .addCase(emailVerification.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(resendOTP.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resendOTP.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        const message = action.payload.message;
        toast.success(message);
      })
      .addCase(resendOTP.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(logOut.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logOut.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isSidebarOpen = false;
        removeUserFromLocalStorage();
        const message = action.payload.message;
        toast.success(message);
      })
      .addCase(logOut.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { logoutUser } = userSlice.actions;

export default userSlice.reducer;
