export enum Category {
  FRUITS = 'Fruits',
  VEGETABLES = 'Vegetables',
  LEAFY_GREENS = 'Leafy Greens',
  ROOTS = 'Root Vegetables',
  EXOTIC = 'Exotic'
}

export interface Product {
  id: string;
  name: string;
  price: number;
  unit: string; // e.g., 'kg', 'bunch', 'pc'
  isFresh: boolean;
  category: Category;
  image: string;
  discountPrice?: number;
  description?: string;
}

export interface ShopOffer {
  id: string;
  title: string;
  description: string;
  code: string;
  discountPercentage: number;
}

export interface Shop {
  id: string;
  name: string;
  ownerName: string;
  phone: string;
  location: string;
  rating: number;
  image: string;
  products: Product[];
  offers: ShopOffer[];
  isOpen: boolean;
}

export interface CartItem extends Product {
  quantity: number;
  shopName: string;
}

export interface User {
  name: string;
  phone: string;
  email: string;
  rewardPoints: number;
  monthlySpend: number;
  spendThreshold: number; // Amount needed to reach next tier/coupon
}

export type ViewState = 'HOME' | 'SHOP_DETAIL';