import { Action, configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cart/cartSlice';
import userReducer from './features/user/userSlice';
import wishListReducer from './features/wishList/wishListSlice';
import { ThunkAction } from 'redux-thunk';

// Define the store configuration with typed reducers
export const store = configureStore({
  reducer: {
    mashawiCart: cartReducer,
    wishList: wishListReducer,
    user: userReducer,
  },
});

// Define RootState type which represents the entire state of the Redux store
export type RootState = ReturnType<typeof store.getState>;

// Define AppDispatch type which represents the dispatch function with the store's actions
export type AppDispatch = typeof store.dispatch;

// Define AppThunk type with proper typing for the state
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
