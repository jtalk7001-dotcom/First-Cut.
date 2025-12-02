export type UserType = 'customer' | 'owner';

export interface Wallet {
  pending: number;
  available: number;
}

export interface Shop {
  id: number;
  name: string;
  address: string;
  ownerName: string;
  mobile: string;
  email: string;
  password?: string;
  distance: string;
  rating: number;
  reviews: number;
  image: string;
  isOpen: boolean;
  bookedSlots: string[];
  wallet: Wallet;
}

export interface Service {
  id: string;
  name: string;
  price: number;
  duration: number;
}

export interface User {
  name: string;
  type: UserType;
  shopId?: number;
  contact?: string;
}

export interface Transaction {
  id: number;
  shopId: number;
  type: 'credit' | 'debit';
  amount: number;
  desc: string;
  status: 'pending' | 'available' | 'completed';
  date: string;
}

export interface BookingDetails {
  shop: Shop;
  services: Service[];
  slot: string;
  subtotal: number;
  platformFee: number;
  grandTotal: number;
  shopEarnings: number;
  id: string;
}

export type ViewState = 
  | 'login' 
  | 'registerShop' 
  | 'home' 
  | 'shop' 
  | 'payment' 
  | 'success' 
  | 'ownerDashboard';

export interface FAQItem {
  q: string;
  a: string;
}