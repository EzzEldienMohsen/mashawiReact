import axios, { AxiosInstance } from 'axios';
import { StaticRequestData, User } from '../assets/types';

// Define the base URL
const url = 'https://mshawy.trendline.marketing/api/v1';

// Create an Axios instance
export const autoFetch: AxiosInstance = axios.create({
  baseURL: url,
});

// Response normalization
export const normalizeResponse = (response: any): StaticRequestData => {
  if ('status' in response && 'message' in response && 'data' in response) {
    return response;
  } else if (
    'data' in response &&
    'status' in response.data &&
    'message' in response.data &&
    'data' in response.data
  ) {
    return response.data;
  } else {
    throw new Error('Unexpected response structure');
  }
};

// Add user to localStorage
export const addUserToLocalStorage = (user: User): void => {
  localStorage.setItem('user', JSON.stringify(user));
};

// Remove user from localStorage
export const removeUserFromLocalStorage = (): void => {
  localStorage.removeItem('user');
};

// Get user from localStorage
export const getUserFromLocalStorage = (): User => {
  const user = localStorage.getItem('user');
  if (user) {
    try {
      return JSON.parse(user) as User;
    } catch (error) {
      return {
        user: {
          id: 0,
          f_name: '',
          l_name: '',
          phone: '',
          email: '',
        },
        token: '',
      };
    }
  }
  return {
    user: {
      id: 0,
      f_name: '',
      l_name: '',
      phone: '',
      email: '',
    },
    token: '',
  };
};

// Format price as AED
export const formatPrice = (price: number): string => {
  const derhamAmount = new Intl.NumberFormat('ar-AE', {
    style: 'currency',
    currency: 'AED',
  }).format(price);
  return derhamAmount;
};

// export const amountGeneration = (number: number): JSX.Element[] => {
//   return Array.from({ length: number }, (_, index): JSX.Element => {
//     const optionValue = index + 1;
//     const longLength: JSX.Element = (
//       <option key={optionValue} value={optionValue}>
//         {optionValue}
//       </option>
//     );
//     return longLength;
//   });
// };
