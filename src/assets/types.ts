import { ChangeEvent } from 'react';

export type AddOn = {
  id: number;
  name: string;
  icon: string;
  values: {
    id: number;
    name: string;
    price?: string;
  }[];
};
export type CartItemWithId = {
  cart_id: number;
  cartItem: CartItem;
};
export type CartItem = {
  id: number;
  name: string;
  price: number;
  amount: number;
  image: string;
  additions: AddOn[] | [];
};

export type CartState = {
  isLoading: boolean;
  cartItems: CartItemWithId[];
  numItemsInCart: number;
  cartTotal: number;
  shipping: number;
  tax: number;
  orderTotal: number;
};
export type ApiResponse = {
  message?: string;
  data?: any;
  status: any;
};

export type WishListState = {
  wishListItems: CartItemWithId[];
  numItemsInWishList: number;
  isLoading: boolean;
};
export type UserInfo = {
  id: number;
  f_name: string;
  l_name: string;
  phone: string;
  email: string;
  gender?: string | null;
  work?: string | null;
  nationality?: string | null;
  birthdate?: string | null;
};
export type User = {
  user: UserInfo;
  token: string;
};

export type CompleteUSer = {
  status: number;
  message: string;
  data: User;
};

export type UserState = {
  isLoading: boolean;
  isSidebarOpen: boolean;
  user: User;
};

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

export type ResendOTPData = { email: string };
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
  text: string;
  to: string;
  img?: string;
};

export type Option = { label: string; value: string | number };
export type FormRowProps = {
  name: string;
  type: string;
  half?: boolean;
  isBorder?: boolean;
  required?: boolean;
  handleChange: (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  value: string | null;
  icon?: string;
  high?: boolean;
  full?: boolean;
  placeHolder?: string;
  label?: string;
  isOTP?: boolean;
  options?: Option[];
  handleKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  inputRef?: React.Ref<HTMLInputElement>;
};
export type Error403 = {
  status: number;
  message: string;
  data: null;
};

export type InitialOTPInputs = {
  firstNum: string;
  secondNum: string;
  thirdNum: string;
  fourthNum: string;
  fifthNum: string;
  sixthNum: string;
  [key: string]: string;
};

export type ChangePasswordData = {
  old_password: string;
  password: string;
  password_confirmation: string;
};

export type AddressData = {
  id: string;
  icon: string;
  mainAddress: string;
  sideAddress: string;
  mobIcon: string;
  mobNumber: string;
  phIcon: string;
  phNumber: string;
  timeIcon: string;
  time: string;
};
export type ContactInitialValues = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

export type GalleryElement = { id: string; img: string };
export type PrivacyPolicyElement = { id: string; text: string };

export type InitialProfileValues = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  birthDate: string;
  gender: string;
  country: string;
  profession: string;
};

export type ProfileLink = {
  id: string;
  img: string;
  text: string;
  to: string;
};
export type MyOrder = {
  id: string;
  title: string;
  price: string;
  currency: string;
  date: string;
};

export type AboutExcellenceUnit = {
  id: string;
  src: string;
  title: string;
  text: string;
};
// Query Params
export type DeliveryQueryParams = {
  queryKey: string[];
  queryFn: () => Promise<StaticRequestData>;
};

export type StaticRequestData = {
  status: number;
  message: string;
  data: string;
};

export type PrivacyResp = {
  data: {
    status: number;
    message: string;
    data: string;
  };
  status: number;
  statusText: string;
  headers: {
    'cache-control': string;
    'content-type': string;
  };
  config: {
    transitional: {
      silentJSONParsing: boolean;
      forcedJSONParsing: boolean;
      clarifyTimeoutError: boolean;
    };
    adapter: string[];
    transformRequest: (null | any)[];
    transformResponse: (null | any)[];
    timeout: number;
    xsrfCookieName: string;
    xsrfHeaderName: string;
    maxContentLength: number;
    maxBodyLength: number;
    env: object;
    headers: {
      Accept: string;
      lang: string;
    };
    baseURL: string;
    url: string;
    method: string;
  };
  request: object;
};

export type SingleEvent = {
  img: string;
  icon: string;
  timeText: string;
  title: string;
  id: string;
  text: string;
};
export type Tracker = {
  id: string;
  text: string;
  img: string;
  status: 'complete' | 'upcoming';
};

// Meals Data type
export type Meals = {
  status?: number;
  message?: string;
  data: {
    current_page: number;
    pages_length: number;
    data: {
      id: number;
      name: string;
      description: string;
      price: number;
      image: string;
      gallery: string[];
      categories: {
        id: number;
        name: string;
        icon: string;
        parent: null | string;
      }[];
      additions: {
        id: number;
        name: string;
        icon: string;
        values: {
          id: number;
          name: string;
        }[];
      }[];
    }[];
  };
};
export type SingleMealData = {
  id: number;
  name: string;
  description?: string;
  price: number;
  image: string;
  gallery?: string[];
  categories?: {
    id: number;
    name: string;
    icon: string;
    parent: null | string;
  }[];
  additions: {
    id: number;
    name: string;
    icon: string;
    values: {
      id: number;
      name: string;
      price?: string;
    }[];
  }[];
};
export type MealData = SingleMealData[];

export type Categories = {
  status: number;
  message: string;
  data: {
    current_page: number;
    pages_length: number;
    data: {
      id: number;
      name: string;
      icon: string;
      children: {
        id: number;
        name: string;
        icon: string;
      }[];
    }[];
  };
};

export type CategoriesData = {
  id: number;
  name: string;
  icon: string;
  children: {
    id: number;
    name: string;
    icon: string;
  }[];
}[];

// Define the type for an individual gallery item
type GalleryItem = {
  id: number;
  path: string;
};

// Define the type for the data part of the response
type GalleryData = {
  current_page: number;
  pages_length: number;
  data: GalleryItem[];
};

// Define the type for the entire response
export type GalleryResponse = {
  status: number;
  message: string;
  data: GalleryData;
};
export type CardData = {
  cardNumber: string;
  cardHolderName: string;
  cardDate: string;
  CVV: string;
};

// News And Events

export type EventsResponse = {
  status: number;
  message: string;
  data: EventData[];
};

export type EventData = {
  id: number | string;
  image: string;
  title: string;
  date: string;
};
export type Event = {
  image: string;
  date: string;
  title: string;
  id: string;
};
export type EventsQuery = {
  queryKey: string[];
  queryFn: () => Promise<EventsResponse>;
};
// Single event

export type SingleEventResponse = {
  status: number;
  message: string;
  data: SingleEventData;
};

export type SingleEventData = {
  id: number;
  image: string;
  title: string;
  content: string;
  date: string;
};

export type SingleEventQuery = {
  queryKey: (string | undefined)[];
  queryFn: () => Promise<SingleEventResponse>;
};

// Address type
export type AddressResponse = {
  status: number;
  message: string;
  data: TheAddressData[];
};
export type TheAddressData = {
  id: number;
  order: number;
  name: string;
  address: string;
  phone: string;
  landing_phone: string;
  working_time: string;
  weekend: string[];
  location: string;
};

// Social Media

export type SocialResponse = {
  status: number;
  message: string;
  data: {
    facebook: string;
    instagram: string;
    linkedin: string;
    twitter: string;
  };
};
// types.ts

export type SingleBlogResponse = {
  status: number;
  message: string;
  data: {
    id: number;
    image: string;
    title: string;
    content: string;
    date: string; // Use `string` here as ISO date strings are usually represented as strings in JSON
  };
};
