export type ResetPasswordResponse = {
  status: number;
  message: string;
  data: {
    temp_token: string;
  };
};
