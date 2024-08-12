export type AddressData = {
  id: number;
  name: string;
  details: string;
  phone: string;
  landing_phone: string;
  created_at: string;
};

export type GetAddressResponse = {
  status: number;
  message: string;
  data: AddressData[];
};

export type CreateAddressReq = {
  name: string;
  details: string;
  phone: string;
  landing_phone: string;
};
export type CreateAddressResponse = {
  status: number;
  message: string;
  data: AddressData;
};
export type RemoveAddressRes = {
  state: number;
  message: string;
  data: null;
};

export type AddressState = {
  isLoading: boolean;
  address: AddressData[];
};
