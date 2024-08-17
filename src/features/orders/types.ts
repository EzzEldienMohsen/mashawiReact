// Orders

export type OrdersData = {
  id: number;
  total: string;
  date: string;
};
export type OrdersResponse = {
  status: number;
  message: string;
  data: OrdersData[];
};

export type SingleOrderResponse = {
  status: number;
  message: string;
  data: {
    id: number;
    status: string;
    meals: {
      id: number;
      meal: string;
      additions: {
        name: string;
        value: string;
      }[];
      quantity: number;
      total: string;
    }[];
    address: string;
    branch: string | null;
    calculations: {
      subtotal: string;
      vat: string;
      discount: string;
      total: string;
    };
  };
};

export type OrdersState = {
  isLoading: boolean;
  orders: OrdersData[];
  singleOrder: SingleOrderResponse;
};
