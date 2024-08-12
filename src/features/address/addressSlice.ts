import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  AddressData,
  AddressState,
  CreateAddressReq,
  CreateAddressResponse,
  GetAddressResponse,
  RemoveAddressRes,
} from './types';
import {
  createAddressThunk,
  deleteAddressThunk,
  getAddressThunk,
  updateAddressThunk,
} from './addressThunk';
import { toast } from 'react-toastify';
// import { RootState } from '../../store';

const initialAddress: AddressData[] = [];

const initialState: AddressState = {
  isLoading: false,
  address: initialAddress,
};

export const getAddress = createAsyncThunk(
  'address/getAddress',
  async (data: { token: string; language: string }, thunkAPI) => {
    const { token, language } = data;
    return getAddressThunk('/addresses', token, language, thunkAPI);
  }
);
export const createAddress = createAsyncThunk(
  'address/createAddress',
  async (
    data: { reqData: CreateAddressReq; token: string; language: string },
    thunkAPI
  ) => {
    const { reqData, token, language } = data;
    return createAddressThunk(
      '/addresses/create',
      reqData,
      token,
      language,
      thunkAPI
    );
  }
);

export const updateAddress = createAsyncThunk(
  'address/updateAddress',
  async (
    data: {
      id: string;
      reqData: CreateAddressReq;
      token: string;
      language: string;
    },
    thunkAPI
  ) => {
    const { id, reqData, token, language } = data;
    return updateAddressThunk(
      `/addresses/update/${id}`,
      reqData,
      token,
      language,
      thunkAPI
    );
  }
);
export const deleteAddress = createAsyncThunk(
  'address/deleteAddress',
  async (data: { id: string; token: string; language: string }, thunkAPI) => {
    const { id, token, language } = data;
    return deleteAddressThunk(
      `/addresses/delete/${id}`,
      token,
      language,
      thunkAPI
    );
  }
);

const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getAddress.fulfilled,
        (state, action: PayloadAction<GetAddressResponse>) => {
          state.isLoading = false;
          const address = state.address;
          state.address = action.payload.data;
          localStorage.setItem('mashawiAddress', JSON.stringify(address));
        }
      )
      .addCase(getAddress.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(createAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        createAddress.fulfilled,
        (state, action: PayloadAction<CreateAddressResponse>) => {
          state.isLoading = false;
          state.address.push(action.payload.data);
          const address = state.address;
          localStorage.setItem('mashawiAddress', JSON.stringify(address));
          const message = action.payload.message;
          toast.success(message);
        }
      )
      .addCase(createAddress.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        updateAddress.fulfilled,
        (state, action: PayloadAction<CreateAddressResponse>) => {
          state.isLoading = false;
          // state.address.filter((add) => add.id !== action.payload.data.id);
          // state.address.push(action.payload.data);
          // const address = state.address;
          // localStorage.setItem('mashawiAddress', JSON.stringify(address));
          const message = action.payload.message;
          toast.success(message);
        }
      )
      .addCase(updateAddress.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        deleteAddress.fulfilled,
        (state, action: PayloadAction<RemoveAddressRes>) => {
          state.isLoading = false;
          const message = action.payload.message;
          toast.success(message);
        }
      )
      .addCase(deleteAddress.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default addressSlice.reducer;
