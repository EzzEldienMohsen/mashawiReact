// Orders

export type OrdersData = {
  id: number;
  total: number;
  date: string;
};
export type OrdersResponse = {
  status: number;
  message: string;
  data: OrdersData[];
};
export type CheckoutResponse = {
  status: number;
  message: string;
  data: OrdersData;
};

export type SingleOrderResponse = {
  status: number;
  message: string;
  data: {
    id: number;
    status: string;
    meals: {
      id: number;
      image: string;
      meal: string;
      additions: {
        name: string;
        value: string;
      }[];
      quantity: number;
      total: string;
    }[];
    address: {
      name: string | null;
      details: string | null;
      phone: string | null;
      landing_phone: string | null;
    } | null;
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
  orderTotal: OrderCalc;
};
export type OrderCalc = {
  sub_total: string;
  vat_percent: string;
  vat: string;
  total: string;
  total_before?: string | null;
  discount?: string | null;
  total_after?: string | null;
};

export type GetCalcRes = {
  status: number;
  message: string;
  data: OrderCalc;
};

export type ApplyCouponRes = {
  status: number;
  message: string;
  data: {
    total_before: string;
    discount: string;
    total_after: string;
  };
};

export type CheckoutReq = {
  payment_method: string;
  address_id: number | null;
  branch_id: number | null;
  notes: string;
  coupon_code: string;
};
