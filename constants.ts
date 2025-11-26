import { Category, Shop, Product, User } from './types';

const generateProducts = (shopId: string): Product[] => [
  {
    id: `p1-${shopId}`,
    name: 'Red Tomatoes',
    price: 40,
    unit: 'kg',
    isFresh: true,
    category: Category.VEGETABLES,
    image: 'https://picsum.photos/seed/tomato/300/300',
    discountPrice: 35
  },
  {
    id: `p2-${shopId}`,
    name: 'Fresh Spinach',
    price: 20,
    unit: 'bunch',
    isFresh: true,
    category: Category.LEAFY_GREENS,
    image: 'https://picsum.photos/seed/spinach/300/300'
  },
  {
    id: `p3-${shopId}`,
    name: 'Alphonso Mango',
    price: 600,
    unit: 'doz',
    isFresh: true,
    category: Category.FRUITS,
    image: 'https://picsum.photos/seed/mango/300/300',
    description: 'Ratnagiri special'
  },
  {
    id: `p4-${shopId}`,
    name: 'Potatoes (New Harvest)',
    price: 30,
    unit: 'kg',
    isFresh: false,
    category: Category.ROOTS,
    image: 'https://picsum.photos/seed/potato/300/300'
  },
  {
    id: `p5-${shopId}`,
    name: 'Broccoli',
    price: 120,
    unit: 'kg',
    isFresh: true,
    category: Category.EXOTIC,
    image: 'https://picsum.photos/seed/broccoli/300/300',
    discountPrice: 90
  },
  {
    id: `p6-${shopId}`,
    name: 'Carrots',
    price: 45,
    unit: 'kg',
    isFresh: true,
    category: Category.ROOTS,
    image: 'https://picsum.photos/seed/carrot/300/300'
  }
];

export const MOCK_SHOPS: Shop[] = [
  {
    id: 's1',
    name: 'Gupta Fresh Veggies',
    ownerName: 'Rajesh Gupta',
    phone: '+91 98765 43210',
    location: 'Sector 14, Gurgaon',
    rating: 4.8,
    image: 'https://picsum.photos/seed/shop1/600/400',
    isOpen: true,
    offers: [
      { id: 'o1', title: 'Monsoon Special', description: '20% off on all Leafy Greens', code: 'RAIN20', discountPercentage: 20 },
      { id: 'o2', title: 'Bulk Buy', description: 'Flat ₹50 off on orders above ₹500', code: 'BULK50', discountPercentage: 10 }
    ],
    products: generateProducts('s1')
  },
  {
    id: 's2',
    name: 'Green Farm Organics',
    ownerName: 'Sunita Sharma',
    phone: '+91 99887 76655',
    location: 'Indiranagar, Bangalore',
    rating: 4.5,
    image: 'https://picsum.photos/seed/shop2/600/400',
    isOpen: true,
    offers: [
       { id: 'o3', title: 'First Order', description: '10% off for new customers', code: 'NEW10', discountPercentage: 10 }
    ],
    products: generateProducts('s2')
  },
  {
    id: 's3',
    name: 'Daily Mart',
    ownerName: 'Vikram Singh',
    phone: '+91 88776 65544',
    location: 'Andheri West, Mumbai',
    rating: 4.2,
    image: 'https://picsum.photos/seed/shop3/600/400',
    isOpen: false,
    offers: [],
    products: generateProducts('s3')
  }
];

export const MOCK_USER: User = {
  name: "Anjali Desai",
  phone: "+91 98765 00001",
  email: "anjali.desai@example.com",
  rewardPoints: 1250,
  monthlySpend: 3400,
  spendThreshold: 5000
};

export const APP_NAME = "FreshVegies.in";