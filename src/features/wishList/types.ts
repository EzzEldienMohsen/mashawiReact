export type WishListType = {
  status: number;
  message: string;
  data: {
    wish_id: number;
    meal: {
      id: number;
      name: string;
      description: string;
      price: number;
      image: string;
      gallery: string[]; // Assuming gallery is an array of URLs
      categories: {
        id: number;
        name: string;
        icon: string;
      }[];
      additions: any[]; // Define this more specifically if possible
    };
  };
};

export type AddToWishListRequest = { meal_id: number };
export type getWishListResponse = {
  status: number;
  message: string;
  data: {
    wish_id: number;
    meal: {
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
      }[];
      additions: any[]; // You can replace 'any' with the actual type if you know the structure of additions
    };
  }[];
};
