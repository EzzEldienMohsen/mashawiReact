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
} from './userThunk';
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from '../../utils';
import { toast } from 'react-toastify';
import { User, UserState } from '../../assets/types';



const initialUser: User = getUserFromLocalStorage() || { temp_token: '' };
const initialState: UserState = {
  isLoading: false,
  isSidebarOpen: false,
  user: initialUser,
};

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (reqData: any, thunkAPI) => {
    return registerUserThunk('/auth/register', reqData, thunkAPI);
  }
);
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (reqData: any, thunkAPI) => {
    return loginThunk('/auth/login', reqData, thunkAPI);
  }
);
export const forgetPassword = createAsyncThunk(
  'user/forgetPassword',
  async (reqData: any, thunkAPI) => {
    return forgetPasswordThunk('/auth/forget-password', reqData, thunkAPI);
  }
);
export const emailVerification = createAsyncThunk(
  'user/emailVerification',
  async (reqData: any, thunkAPI) => {
    return emailVerificationThunk('/auth/verify-email', reqData, thunkAPI);
  }
);
export const resendOTP = createAsyncThunk(
  'user/resendOTP',
  async (reqData: any, thunkAPI) => {
    return resendOTPThunk('/auth/resend-otp', reqData, thunkAPI);
  }
);
export const validateOTP = createAsyncThunk(
  'user/validateOTP',
  async (reqData: any, thunkAPI) => {
    return validateOTPThunk('/auth/validate-otp', reqData, thunkAPI);
  }
);
export const resetPassword = createAsyncThunk(
  'user/resetPassword',
  async (reqData: any, thunkAPI) => {
    const { user } = thunkAPI.getState() as { user: UserState };
    return resetPasswordThunk(
      '/auth/reset-password',
      { ...reqData, token: user.user?.temp_token },
      thunkAPI
    );
  }
);
export const logOut = createAsyncThunk('user/logOut', async (thunkAPI) => {
  return logOutThunk('/auth/logout', thunkAPI);
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    logoutUser: (state) => {
      state.user = null;
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
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        const user = action.payload.data;
        state.user = user;
        addUserToLocalStorage(user);
      })
      .addCase(loginUser.rejected, (state) => {
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
      .addCase(forgetPassword.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(validateOTP.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(validateOTP.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        const user = action.payload;
        state.user = user;
        addUserToLocalStorage(user);
        const message = action.payload.message;
        toast.success(message);
      })
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
        const message = action.payload.message;
        toast.success(message);
      })
      .addCase(logOut.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { toggleSidebar, logoutUser } = userSlice.actions;

export default userSlice.reducer;
