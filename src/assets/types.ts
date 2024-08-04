import { ChangeEvent } from "react";

export interface AddOn {
  id: string;
  isChecked: boolean;
  name: string;
  img: string;
  price: number;
  currency: string;
  text1: string;
  text2: string;
};

export type CartItem = {
  id: string;
  name: string;
  price: number;
  currency: string;
  amount: number;
  img: string;
  addOns: AddOn[] | [];
};

export interface CartState {
  cartItems: CartItem[];
  numItemsInCart: number;
  cartTotal: number;
  shipping: number;
  tax: number;
  orderTotal: number;
};
export interface ApiResponse {
  message?: string;
  data?: any;
  status: any;
}

export interface WishListState {
  wishListItems: CartItem[];
  numItemsInWishList: number;
}

export interface User {
  temp_token: string;
}

export interface UserState {
  isLoading: boolean;
  isSidebarOpen: boolean;
  user: User | null;
}

export type RegisterData = {
  f_name: string;
  l_name: string;
  email: string;
  phone: string;
  password: string;
  password_confirmation: string;
};
export type EmailVerificationData = {
  email: string;
  token: number;
};

export type LoginData = {
  email: string;
  password: string;
};

export type ResendOTPData = { email:string};
export type ForgetPasswordData = {
  email: string;
};
export type ValidateOTPData = {
  email: string;
  token: string;
};
export type ResetPasswordData = {
  password: string;
  password_confirmation: string;
  token: string;
};
export type Link = {
  text:string;to:string; img?:string;
}

export type Option = {  label:string;value:string}
export type FormRowProps = {
  name: string;
  type: string;
  handleChange: (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  value: string;
  icon?: string;
  high?:boolean;
  full?:boolean;
  placeHolder?:string;
  label?:string;
  isOTP?:boolean;
  options?:Option[]
};
export type Error403 = {
  status: number;
  message: string;
  data: null;
};

export type  InitialOTPInputs = {
  firstNum: string;
  secondNum: string;
  thirdNum: string;
  fourthNum: string;
  fifthNum: string;
  sixthNum: string;
};

export interface ChangePasswordData {
  old_password: string;
  password: string;
  password_confirmation: string;
}

export type AddressData = {
  id:string;
  icon:string;
    mainAddress: string;
    sideAddress: string;
    mobIcon: string;
    mobNumber: string;
    phIcon:string;
    phNumber: string;
    timeIcon: string;
    time: string;
  }
  export type ContactInitialValues = {
  name: string;
  email: string;
  mobile:string;
  subject: string;
  text: string;
};

export type GalleryElement = {id:string;img:string};
export type PrivacyPolicyElement = {id:string;text:string}

// Query Params
export interface DeliveryQueryParams {
  queryKey: string[];
  queryFn: () => Promise<any>;
}

export type InitialProfileValues = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  birthDate: string;
  gender: string;
  country: string;
  profession:string;
};

export type ProfileLink = {
  id:string;
  img:string;
  text:string;
  to:string;
}
export type MyOrder =  {
    id:string;
    img: string;
    title: string;
    price: string;
    date: string;
    address: string;
  };
