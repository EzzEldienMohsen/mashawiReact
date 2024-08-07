type AdditionRequest = {
  id: number;
  value: number;
};

export type MealRequest = {
  meal_id: number;
  qty: number;
  additions: AdditionRequest[];
};

type Category = {
  id: number;
  name: string;
  icon: string;
};

type Value = {
  id: number;
  name: string;
};

type AdditionResponse = {
  id: number;
  name: string;
  icon: string;
  values: Value[];
};

type InnerMealResponse = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  gallery: string[];
  categories: Category[];
  additions: AdditionResponse[];
};

type SelectedAddition = {
  addition: AdditionResponse;
  value: Value;
};

export type CartData = {
  cart_id: number;
  qty: number;
  meal: InnerMealResponse;
  selected_additions: SelectedAddition[];
};

export type MealResponse = {
  status: number;
  message: string;
  data: CartData;
};
