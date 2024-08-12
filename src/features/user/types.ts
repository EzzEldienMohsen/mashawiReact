import { UserInfo } from '../../assets/types';

export type ResetPasswordResponse = {
  status: number;
  message: string;
  data: {
    user: {
      id: number;
      f_name: string;
      l_name: string;
      phone: string;
      email: string;
    };
    token: string;
  };
};

export type GetUserResponse = {
  status: number;
  message: string;
  data: UserInfo;
};
export type UpdateUserReq = {
  f_name: string;
  l_name: string;
  phone: string;
  email: string;
  gender: string | null;
  work: string | null;
  nationality: string | null;
  birthdate: string | null;
};

export type ValidateOTPRes = {
  status: number;
  message: string;
  data: {
    temp_token: string;
  };
};
