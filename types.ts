
export type DeliveryType = 'Physical' | 'Digital';

export interface TrustMetrics {
  deliveryReliability: number; // 30%
  reviewAuthenticity: number; // 25%
  returnSuccessRate: number; // 20%
  productMatchAccuracy: number; // 15%
  disputeResolutionSpeed: number; // 10%
}

export interface Seller {
  id: string;
  name: string;
  trustScore: number;
  metrics: TrustMetrics;
  verified: boolean;
  totalSales: number;
  joinedDate: string;
  location: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  originalPrice: number;
  image: string;
  images: string[];
  seller: Seller;
  deliveryType: DeliveryType;
  estimatedDeliveryDays: number;
  returnPolicy: string;
  features: string[];
  tags: string[];
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  productName?: string;
  productImage?: string;
  rating: number;
  comment: string;
  date: string;
  isVerified: boolean;
  isAiFlaggedFake?: boolean;
}

export interface Order {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  status: 'Confirmed' | 'Packed' | 'Shipped' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
  date: string;
  estimatedDelivery: string;
  price: number;
  sellerName: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  joinedDate: string;
  accountType: 'Buyer' | 'Seller';
  trustScore: number;
  orders: Order[];
  reviews: Review[];
  savedProductIds: string[];
}
