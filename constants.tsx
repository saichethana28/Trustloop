
import React from 'react';
import { Product, ProductType, Seller, User, UserRole, Review, Address } from './types';

export const ICONS = {
  Search: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>,
  Shield: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  Package: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>,
  User: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Check: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  Alert: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
  Cart: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>,
  TrendingUp: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
  CreditCard: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>,
  Home: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  MapPin: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>,
  Phone: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
  Download: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
};

export const MOCK_USER: User = {
  id: 'u1',
  name: 'Sai Chethana',
  role: UserRole.BUYER,
  email: 'sai.chethana@trustloop.io'
};

export const MOCK_ADDRESSES: Address[] = [
  {
    id: 'a1',
    name: 'Sai Chethana',
    street: '12th Cross, Indiranagar',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560038',
    phone: '+91 9876543210',
    isDefault: true,
  },
  {
    id: 'a2',
    name: 'Sai Chethana',
    street: 'Sector 4, HSR Layout',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560102',
    phone: '+91 9876543210',
    isDefault: false,
  }
];

export const MOCK_SELLERS: Seller[] = [
  {
    id: 's1',
    name: 'TechGiant Solutions',
    avatar: 'https://picsum.photos/seed/s1/100/100',
    trustScore: 94,
    deliveryReliability: 98,
    returnSuccessRate: 92,
    joinedDate: '2021-01-15',
    totalOrders: 1540,
  },
  {
    id: 's2',
    name: 'SwiftDeliveries',
    avatar: 'https://picsum.photos/seed/s2/100/100',
    trustScore: 78,
    deliveryReliability: 85,
    returnSuccessRate: 80,
    joinedDate: '2022-06-20',
    totalOrders: 420,
  },
  {
    id: 's3',
    name: 'Reliable Bits',
    avatar: 'https://picsum.photos/seed/s3/100/100',
    trustScore: 91,
    deliveryReliability: 94,
    returnSuccessRate: 95,
    joinedDate: '2020-11-05',
    totalOrders: 2300,
  },
  {
    id: 's4',
    name: 'DesiCrafts Hub',
    avatar: 'https://picsum.photos/seed/s4/100/100',
    trustScore: 96,
    deliveryReliability: 92,
    returnSuccessRate: 98,
    joinedDate: '2019-03-10',
    totalOrders: 890,
  }
];

const generateProductSellers = (basePrice: number) => [
  { sellerId: 's1', price: basePrice, stock: 50, estimatedDeliveryDays: 3 },
  { sellerId: 's2', price: Math.round(basePrice * 0.95), stock: 15, estimatedDeliveryDays: 7 },
  { sellerId: 's3', price: Math.round(basePrice * 1.02), stock: 100, estimatedDeliveryDays: 2 },
];

export const MOCK_PRODUCTS: Product[] = [
  // ELECTRONICS
  {
    id: 'e1',
    name: 'Realme Narzo 60X 5G',
    description: 'High-speed 5G performance with 33W SUPERVOOC charging and 50MP AI camera.',
    image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?q=80&w=600&h=400&auto=format&fit=crop',
    category: 'Electronics',
    type: ProductType.PHYSICAL,
    basePrice: 12999,
    sellers: generateProductSellers(12999)
  },
  {
    id: 'e2',
    name: 'OnePlus Nord Buds 2r',
    description: 'Deep bass, IP55 rating, and up to 38 hours of battery life with case.',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=600&h=400&auto=format&fit=crop',
    category: 'Electronics',
    type: ProductType.PHYSICAL,
    basePrice: 2199,
    sellers: generateProductSellers(2199)
  },
  {
    id: 'e3',
    name: 'boAt Wave Sigma Smartwatch',
    description: '1.96" HD display, Bluetooth calling, and multiple health monitoring modes.',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&h=400&auto=format&fit=crop',
    category: 'Electronics',
    type: ProductType.PHYSICAL,
    basePrice: 1999,
    sellers: generateProductSellers(1999)
  },
  {
    id: 'e4',
    name: 'Lenovo IdeaPad Slim 3',
    description: 'Intel Core i3 12th Gen, 8GB RAM, 512GB SSD, 15.6" FHD Display.',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=600&h=400&auto=format&fit=crop',
    category: 'Electronics',
    type: ProductType.PHYSICAL,
    basePrice: 35990,
    sellers: generateProductSellers(35990)
  },
  {
    id: 'e5',
    name: 'Sony WH-CH520 Headphones',
    description: 'Wireless on-ear headphones with up to 50 hours of battery life and fast charge.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&h=400&auto=format&fit=crop',
    category: 'Electronics',
    type: ProductType.PHYSICAL,
    basePrice: 4490,
    sellers: generateProductSellers(4490)
  },
  
  {
    id: 'e7',
    name: 'Mi 360° Home Security Camera',
    description: '2K resolution, AI motion detection, and two-way audio communication.',
    image: 'https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?q=80&w=600&h=400&auto=format&fit=crop',
    category: 'Electronics',
    type: ProductType.PHYSICAL,
    basePrice: 2999,
    sellers: generateProductSellers(2999)
  },
  {
    id: 'e8',
    name: 'TP-Link Archer C6 Router',
    description: 'AC1200 Dual-Band Gigabit Wireless Router with 4 high-gain antennas.',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=600&h=400&auto=format&fit=crop',
    category: 'Electronics',
    type: ProductType.PHYSICAL,
    basePrice: 2499,
    sellers: generateProductSellers(2499)
  },
  {
    id: 'e9',
    name: 'Logitech B170 Wireless Mouse',
    description: 'Reliable 2.4 GHz wireless connection with up to 12 months battery life.',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=600&h=400&auto=format&fit=crop',
    category: 'Electronics',
    type: ProductType.PHYSICAL,
    basePrice: 599,
    sellers: generateProductSellers(599)
  },
  {
    id: 'e10',
    name: 'Dell 24" S2421HN Monitor',
    description: 'Full HD 1920 x 1080 resolution with ultra-thin bezel design and IPS panel.',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=600&h=400&auto=format&fit=crop',
    category: 'Electronics',
    type: ProductType.PHYSICAL,
    basePrice: 9499,
    sellers: generateProductSellers(9499)
  },

  // EDUCATION
  {
    id: 'ed1',
    name: 'UPSC Foundation Course 2024',
    description: 'Comprehensive study material and video lectures covering Prelims and Mains.',
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=600&h=400&auto=format&fit=crop',
    category: 'Education',
    type: ProductType.DIGITAL,
    basePrice: 14999,
    sellers: [{ sellerId: 's1', price: 14999, stock: 999, estimatedDeliveryDays: 0 }]
  },
  {
    id: 'ed2',
    name: 'Full Stack Web Dev Bootcamp',
    description: 'Master React, Node.js, and MongoDB with 10 industry projects.',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&h=400&auto=format&fit=crop',
    category: 'Education',
    type: ProductType.DIGITAL,
    basePrice: 2499,
    sellers: [{ sellerId: 's1', price: 2499, stock: 999, estimatedDeliveryDays: 0 }]
  },
  {
    id: 'ed4',
    name: 'Spoken English for Career',
    description: 'Improve communication skills, grammar, and fluency for corporate interviews.',
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=600&h=400&auto=format&fit=crop',
    category: 'Education',
    type: ProductType.DIGITAL,
    basePrice: 999,
    sellers: [{ sellerId: 's3', price: 999, stock: 999, estimatedDeliveryDays: 0 }]
  },
  
  {
    id: 'ed6',
    name: 'Digital Marketing Mastery',
    description: 'Learn SEO, SEM, Social Media Marketing, and Google Ads from experts.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&h=400&auto=format&fit=crop',
    category: 'Education',
    type: ProductType.DIGITAL,
    basePrice: 1299,
    sellers: [{ sellerId: 's1', price: 1299, stock: 999, estimatedDeliveryDays: 0 }]
  },
  {
    id: 'ed7',
    name: 'Graphic Design Basics',
    description: 'Master Canva, Photoshop, and Illustrator for creative branding.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=600&h=400&auto=format&fit=crop',
    category: 'Education',
    type: ProductType.DIGITAL,
    basePrice: 799,
    sellers: [{ sellerId: 's1', price: 799, stock: 999, estimatedDeliveryDays: 0 }]
  },
 

  {
    id: 'ed10',
    name: 'Cyber Security Essentials',
    description: 'Understand network security, cryptography, and ethical hacking fundamentals.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&h=400&auto=format&fit=crop',
    category: 'Education',
    type: ProductType.DIGITAL,
    basePrice: 2999,
    sellers: [{ sellerId: 's1', price: 2999, stock: 999, estimatedDeliveryDays: 0 }]
  },

  // FURNITURE
  {
    id: 'f1',
    name: 'Green Soul Jupiter High Back Chair',
    description: 'Ergonomic office chair with breathable mesh and synchronous tilt mechanism.',
    image: 'https://images.unsplash.com/photo-1505797149-43b0069ec26b?q=80&w=600&h=400&auto=format&fit=crop',
    category: 'Furniture',
    type: ProductType.PHYSICAL,
    basePrice: 8990,
    sellers: generateProductSellers(8990)
  },
  {
    id: 'f2',
    name: 'Wakefit Orthopedic Mattress',
    description: '6-inch medium firm memory foam mattress for better sleep and back support.',
    image: 'https://images.unsplash.com/photo-1505691723518-36a5ac3be353?q=80&w=600&h=400&auto=format&fit=crop',
    category: 'Furniture',
    type: ProductType.PHYSICAL,
    basePrice: 11249,
    sellers: generateProductSellers(11249)
  },
  {
    id: 'f3',
    name: 'Nilkamal Freedom Cabinet',
    description: 'Sturdy plastic storage cabinet with multiple shelves for home organization.',
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=600&h=400&auto=format&fit=crop',
    category: 'Furniture',
    type: ProductType.PHYSICAL,
    basePrice: 3450,
    sellers: generateProductSellers(3450)
  },
  {
    id: 'f4',
    name: 'DeckUp Giona Study Table',
    description: 'Compact engineered wood desk with drawers, ideal for home office setups.',
    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?q=80&w=600&h=400&auto=format&fit=crop',
    category: 'Furniture',
    type: ProductType.PHYSICAL,
    basePrice: 4299,
    sellers: generateProductSellers(4299)
  },
  {
    id: 'f5',
    name: 'Amazon Solimo 3-Seater Sofa',
    description: 'Fabric sofa with high-quality density foam and sturdy wood frame.',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=600&h=400&auto=format&fit=crop',
    category: 'Furniture',
    type: ProductType.PHYSICAL,
    basePrice: 15499,
    sellers: generateProductSellers(15499)
  },
  {
    id: 'f6',
    name: 'Sleepyhead Flip Mattress',
    description: 'Dual-sided mattress with hard and soft comfort for custom firmness.',
    image: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=600&h=400&auto=format&fit=crop',
    category: 'Furniture',
    type: ProductType.PHYSICAL,
    basePrice: 7999,
    sellers: generateProductSellers(7999)
  },
  {
    id: 'f7',
    name: 'Bluewud TV Entertainment Unit',
    description: 'Modern wall-mounted TV console for TVs up to 55 inches.',
    image: 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?q=80&w=600&h=400&auto=format&fit=crop',
    category: 'Furniture',
    type: ProductType.PHYSICAL,
    basePrice: 2899,
    sellers: generateProductSellers(2899)
  },
 
  {
    id: 'f9',
    name: 'Nilkamal Plastic Dining Set',
    description: 'Compact 4-seater dining set made of durable weather-proof plastic.',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=600&h=400&auto=format&fit=crop',
    category: 'Furniture',
    type: ProductType.PHYSICAL,
    basePrice: 5999,
    sellers: generateProductSellers(5999)
  },
  {
    id: 'f10',
    name: 'Adiko High Back Mesh Chair',
    description: 'Premium executive chair with headrest and lumbar support for long hours.',
    image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=600&h=400&auto=format&fit=crop',
    category: 'Furniture',
    type: ProductType.PHYSICAL,
    basePrice: 6500,
    sellers: generateProductSellers(6500)
  },

  // FASHION & ACCESSORIES
  {
    id: 'fas1',
    name: 'Titan Neo Analog Watch',
    description: 'Classic silver dial men\'s watch with genuine leather strap.',
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=600&h=400&auto=format&fit=crop',
    category: 'Fashion & Accessories',
    type: ProductType.PHYSICAL,
    basePrice: 3495,
    sellers: generateProductSellers(3495)
  },
  {
    id: 'fas2',
    name: 'FabIndia Cotton Kurta',
    description: 'Hand-stitched regular fit cotton kurta for ethnic and casual wear.',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=600&h=400&auto=format&fit=crop',
    category: 'Fashion & Accessories',
    type: ProductType.PHYSICAL,
    basePrice: 1290,
    sellers: generateProductSellers(1290)
  },

  {
    id: 'fas6',
    name: 'Peter England Slim Fit Shirt',
    description: 'Solid formal shirt with premium cotton blend for office wear.',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=600&h=400&auto=format&fit=crop',
    category: 'Fashion & Accessories',
    type: ProductType.PHYSICAL,
    basePrice: 1499,
    sellers: generateProductSellers(1499)
  },
  {
    id: 'fas7',
    name: 'Sparx Men\'s Sneakers',
    description: 'Casual everyday sneakers with high-grip sole and breathable upper.',
    image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=600&h=400&auto=format&fit=crop',
    category: 'Fashion & Accessories',
    type: ProductType.PHYSICAL,
    basePrice: 1199,
    sellers: generateProductSellers(1199)
  },
  {
    id: 'fas8',
    name: 'Lavie Satchel Handbag',
    description: 'Premium faux leather bag with structured design and adjustable strap.',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=600&h=400&auto=format&fit=crop',
    category: 'Fashion & Accessories',
    type: ProductType.PHYSICAL,
    basePrice: 1849,
    sellers: generateProductSellers(1849)
  },
  
  {
    id: 'fas10',
    name: 'Manyavar Sherwani Set',
    description: 'Elegant beige and gold sherwani for weddings and festive occasions.',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=600&h=400&auto=format&fit=crop',
    category: 'Fashion & Accessories',
    type: ProductType.PHYSICAL,
    basePrice: 7999,
    sellers: generateProductSellers(7999)
  },

  // HOME & KITCHEN

  {
    id: 'hk2',
    name: 'Pigeon Mixer Grinder',
    description: '750W high-speed motor with 3 stainless steel jars for tough grinding.',
    image: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?q=80&w=600&h=400&auto=format&fit=crop',
    category: 'Home & Kitchen',
    type: ProductType.PHYSICAL,
    basePrice: 2199,
    sellers: generateProductSellers(2199)
  },
  {
    id: 'hk3',
    name: 'Kent Grand RO Purifier',
    description: 'RO+UV+UF+TDS water purification for pure and healthy drinking water.',
    image: 'https://images.unsplash.com/photo-1602928321679-560bb453f190?q=80&w=600&h=400&auto=format&fit=crop',
    category: 'Home & Kitchen',
    type: ProductType.PHYSICAL,
    basePrice: 16500,
    sellers: generateProductSellers(16500)
  },
  {
    id: 'hk4',
    name: 'Milton Thermosteel Flask',
    description: '1L vacuum insulated flask that keeps beverages hot or cold for 24 hours.',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=600&h=400&auto=format&fit=crop',
    category: 'Home & Kitchen',
    type: ProductType.PHYSICAL,
    basePrice: 1049,
    sellers: generateProductSellers(1049)
  },
  {
    id: 'hk5',
    name: 'Philips Air Fryer XL',
    description: 'Cook with 90% less fat using Rapid Air technology, 6.2L capacity.',
    image: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?q=80&w=600&h=400&auto=format&fit=crop',
    category: 'Home & Kitchen',
    type: ProductType.PHYSICAL,
    basePrice: 6999,
    sellers: generateProductSellers(6999)
  },
  {
    id: 'hk6',
    name: 'Usha Ceiling Fan',
    description: 'High air delivery with dust-resistant lacquer coating and silent motor.',
    image: 'https://images.unsplash.com/photo-1591122947157-26bad3a117d2?q=80&w=600&h=400&auto=format&fit=crop',
    category: 'Home & Kitchen',
    type: ProductType.PHYSICAL,
    basePrice: 3200,
    sellers: generateProductSellers(3200)
  },
 
  {
    id: 'hk9',
    name: 'Samsung 253L Refrigerator',
    description: 'Double door frost-free fridge with digital inverter technology.',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=600&h=400&auto=format&fit=crop',
    category: 'Home & Kitchen',
    type: ProductType.PHYSICAL,
    basePrice: 24490,
    sellers: generateProductSellers(24490)
  },
  {
    id: 'hk10',
    name: 'Butterfly Smart Glass Gas Stove',
    description: '3-burner gas stove with heat-resistant toughened glass top.',
    image: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?q=80&w=600&h=400&auto=format&fit=crop',
    category: 'Home & Kitchen',
    type: ProductType.PHYSICAL,
    basePrice: 2899,
    sellers: generateProductSellers(2899)
  },

  // HEALTH & WELLNESS

  {
    id: 'hw2',
    name: 'Boldfit Yoga Mat (6mm)',
    description: 'TPE anti-skid dual-layer mat for comfortable home workouts.',
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?q=80&w=600&h=400&auto=format&fit=crop',
    category: 'Health & Wellness',
    type: ProductType.PHYSICAL,
    basePrice: 899,
    sellers: generateProductSellers(899)
  },
  {
    id: 'hw3',
    name: 'Dr Trust BP Monitor',
    description: 'Fully automatic digital blood pressure monitor with voice guide.',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=600&h=400&auto=format&fit=crop',
    category: 'Health & Wellness',
    type: ProductType.PHYSICAL,
    basePrice: 1499,
    sellers: generateProductSellers(1499)
  },
  {
    id: 'hw4',
    name: 'Himalaya Ashwagandha',
    description: 'Pure Ayurvedic herb tablets for stress relief and vitality.',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600&h=400&auto=format&fit=crop',
    category: 'Health & Wellness',
    type: ProductType.PHYSICAL,
    basePrice: 165,
    sellers: generateProductSellers(165)
  },

  {
    id: 'hw7',
    name: 'Mamaearth Onion Hair Oil',
    description: 'Natural ingredients to boost hair growth and reduce hair fall.',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&h=400&auto=format&fit=crop',
    category: 'Health & Wellness',
    type: ProductType.PHYSICAL,
    basePrice: 599,
    sellers: generateProductSellers(599)
  },
  {
    id: 'hw8',
    name: 'Revital H Daily Health',
    description: 'Daily multivitamin supplement for energy, stamina, and mental alertness.',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=600&h=400&auto=format&fit=crop',
    category: 'Health & Wellness',
    type: ProductType.PHYSICAL,
    basePrice: 450,
    sellers: generateProductSellers(450)
  },
  

  // SMART HOME & IOT
  {
    id: 'sh1',
    name: 'Wipro Smart LED Bulb',
    description: 'WiFi enabled bulb with 16 million colors and voice control compatibility.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&h=400&auto=format&fit=crop',
    category: 'Smart Home & IoT',
    type: ProductType.PHYSICAL,
    basePrice: 599,
    sellers: generateProductSellers(599)
  },
  {
    id: 'sh2',
    name: 'Amazon Echo Dot (5th Gen)',
    description: 'Smart speaker with Alexa, deeper bass, and motion detection.',
    image: 'https://images.unsplash.com/photo-1543512214-318c7553f230?q=80&w=600&h=400&auto=format&fit=crop',
    category: 'Smart Home & IoT',
    type: ProductType.PHYSICAL,
    basePrice: 4499,
    sellers: generateProductSellers(4499)
  },
  {
    id: 'sh3',
    name: 'TP-Link Tapo Smart Cam',
    description: 'Pan/Tilt security camera with night vision and motion alerts.',
    image: 'https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?q=80&w=600&h=400&auto=format&fit=crop',
    category: 'Smart Home & IoT',
    type: ProductType.PHYSICAL,
    basePrice: 2199,
    sellers: generateProductSellers(2199)
  },

  {
    id: 'sh5',
    name: 'Atomberg Smart Fan',
    description: 'Energy-efficient BLDC motor fan with remote and smart app control.',
    image: 'https://images.unsplash.com/photo-1591122947157-26bad3a117d2?q=80&w=600&h=400&auto=format&fit=crop',
    category: 'Smart Home & IoT',
    type: ProductType.PHYSICAL,
    basePrice: 4299,
    sellers: generateProductSellers(4299)
  },
  {
    id: 'sh6',
    name: 'Qubo Video Doorbell',
    description: 'Talk to visitors from anywhere and monitor your front door.',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=600&h=400&auto=format&fit=crop',
    category: 'Smart Home & IoT',
    type: ProductType.PHYSICAL,
    basePrice: 6990,
    sellers: generateProductSellers(6990)
  },
  {
    id: 'sh7',
    name: 'Syska Smart LED Strip',
    description: '5m multi-color smart LED strip with music sync feature.',
    image: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?q=80&w=600&h=400&auto=format&fit=crop',
    category: 'Smart Home & IoT',
    type: ProductType.PHYSICAL,
    basePrice: 1499,
    sellers: generateProductSellers(1499)
  },
  {
    id: 'sh8',
    name: 'Yale Digital Smart Lock',
    description: 'Keyless entry with fingerprint, PIN code, and mobile app access.',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=600&h=400&auto=format&fit=crop',
    category: 'Smart Home & IoT',
    type: ProductType.PHYSICAL,
    basePrice: 12500,
    sellers: generateProductSellers(12500)
  },

  {
    id: 'sh10',
    name: 'Mi Water Leak Sensor',
    description: 'Real-time alerts for water leak detection in kitchen or bathroom.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&h=400&auto=format&fit=crop',
    category: 'Smart Home & IoT',
    type: ProductType.PHYSICAL,
    basePrice: 999,
    sellers: generateProductSellers(999)
  },

  // LOCAL & HANDMADE
  {
    id: 'lh1',
    name: 'Channapatna Wooden Toys',
    description: 'Traditional handcrafted non-toxic wooden toys for children made by Indian artisans.',
    image: 'https://images.unsplash.com/photo-1532330393533-443990a51d10?q=80&w=600&h=400&auto=format&fit=crop',
    category: 'Local & Handmade Products',
    type: ProductType.PHYSICAL,
    basePrice: 1250,
    sellers: [{ sellerId: 's4', price: 1250, stock: 30, estimatedDeliveryDays: 5 }]
  },
  {
    id: 'lh2',
    name: 'Madhubani Wall Art',
    description: 'Authentic hand-painted Mithila art on handmade paper, ideal for home decor.',
    image: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?q=80&w=600&h=400&auto=format&fit=crop',
    category: 'Local & Handmade Products',
    type: ProductType.PHYSICAL,
    basePrice: 2499,
    sellers: [{ sellerId: 's4', price: 2499, stock: 10, estimatedDeliveryDays: 8 }]
  },
  {
    id: 'lh3',
    name: 'Kashmiri Saffron (1g)',
    description: 'Pure Grade A1 Mogra Saffron from Pampore, Kashmir. Laboratory tested.',
    image: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?q=80&w=600&h=400&auto=format&fit=crop',
    category: 'Local & Handmade Products',
    type: ProductType.PHYSICAL,
    basePrice: 395,
    sellers: [{ sellerId: 's4', price: 395, stock: 100, estimatedDeliveryDays: 4 }]
  },
  {
    id: 'lh4',
    name: 'Jaipur Blue Pottery Vase',
    description: 'Traditional blue ceramic pottery from Rajasthan, handcrafted with floral motifs.',
    image: 'https://images.unsplash.com/photo-1581704906775-891dd5207444?q=80&w=600&h=400&auto=format&fit=crop',
    category: 'Local & Handmade Products',
    type: ProductType.PHYSICAL,
    basePrice: 1599,
    sellers: [{ sellerId: 's4', price: 1599, stock: 15, estimatedDeliveryDays: 7 }]
  },

  {
    id: 'lh6',
    name: 'Brass Diya Set (Pack of 2)',
    description: 'Handcrafted solid brass oil lamps for festivals and home rituals.',
    image: 'https://images.unsplash.com/photo-1578326457399-3b34dbbf23b8?q=80&w=600&h=400&auto=format&fit=crop',
    category: 'Local & Handmade Products',
    type: ProductType.PHYSICAL,
    basePrice: 699,
    sellers: [{ sellerId: 's4', price: 699, stock: 50, estimatedDeliveryDays: 4 }]
  },
  {
    id: 'lh7',
    name: 'Pashmina Shawl (Hand-spun)',
    description: 'Pure Ladakhi Pashmina wool shawl, known for warmth and soft texture.',
    image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?q=80&w=600&h=400&auto=format&fit=crop',
    category: 'Local & Handmade Products',
    type: ProductType.PHYSICAL,
    basePrice: 5400,
    sellers: [{ sellerId: 's4', price: 5400, stock: 5, estimatedDeliveryDays: 10 }]
  },


  {
    id: 'lh10',
    name: 'Soy Scented Candles (Set of 3)',
    description: 'Natural hand-poured soy wax candles with lavender and sandalwood aroma.',
    image: 'https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?q=80&w=600&h=400&auto=format&fit=crop',
    category: 'Local & Handmade Products',
    type: ProductType.PHYSICAL,
    basePrice: 449,
    sellers: [{ sellerId: 's4', price: 449, stock: 60, estimatedDeliveryDays: 4 }]
  },
];

export const MOCK_REVIEWS: Review[] = [
  {
    id: 'r1',
    productId: 'e1',
    sellerId: 's1',
    userId: 'u1',
    userName: 'Sai Chethana',
    rating: 5,
    comment: 'Amazing product! The delivery was super fast and the packaging was robust. Definitely trust this seller.',
    date: '2023-12-01',
    dimensions: { quality: 5, honesty: 5, delivery: 5 },
    isVerified: true,
    isHelpfulCount: 12
  }
];
