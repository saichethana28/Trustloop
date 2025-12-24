
export enum ProductType {
  PHYSICAL = 'PHYSICAL',
  DIGITAL = 'DIGITAL'
}

export enum UserRole {
  BUYER = 'BUYER',
  SELLER = 'SELLER',
  ADMIN = 'ADMIN'
}

export enum OrderStatus {
  PLACED = 'PLACED',
  PACKED = 'PACKED',
  SHIPPED = 'SHIPPED',
  OUT_FOR_DELIVERY = 'OUT_FOR_DELIVERY',
  DELIVERED = 'DELIVERED',
  COMPLETED = 'COMPLETED'
}

export enum PaymentMethod {
  UPI = 'UPI',
  CARD = 'CARD',
  NET_BANKING = 'NET_BANKING',
  WALLET = 'WALLET',
  COD = 'COD'
}

export interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  isDefault: boolean;
}

export interface Seller {
  id: string;
  name: string;
  avatar: string;
  trustScore: number;
  deliveryReliability: number;
  returnSuccessRate: number;
  joinedDate: string;
  totalOrders: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  type: ProductType;
  basePrice: number;
  sellers: ProductSeller[];
}

export interface ProductSeller {
  sellerId: string;
  price: number;
  stock: number;
  estimatedDeliveryDays: number;
}

export interface Review {
  id: string;
  productId: string;
  sellerId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  dimensions: {
    quality: number;
    honesty: number;
    delivery: number;
  };
  isVerified: boolean;
  isHelpfulCount: number;
}

export interface Order {
  id: string;
  userId: string;
  productId: string;
  productName: string;
  productImage: string;
  sellerId: string;
  sellerName: string;
  price: number;
  status: OrderStatus;
  type: ProductType;
  date: string;
  paymentMethod: PaymentMethod;
  address?: Address;
  trackingTimeline: {
    status: OrderStatus;
    timestamp: string;
  }[];
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
}
