export type ProductCategory = 'oversized-tees' | 'regular-fit' | 'hoodies' | 'bottomwear';

export type ProductSize = 'S' | 'M' | 'L' | 'XL' | 'XXL';

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory;
  categoryLabel: string;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  description: string;
  fabric: string;
  gsm: number;
  fit: string;
  color: string;
  colorHex: string;
  images: string[];
  sizes: {
    size: ProductSize;
    inStock: boolean;
  }[];
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  isFeatured?: boolean;
  dropNumber?: string;
  tags: string[];
  care: string[];
}

export interface CartItem {
  id: string; // product.id + '-' + size
  product: Product;
  size: ProductSize;
  quantity: number;
}

export interface WishlistItem {
  productId: string;
  addedAt: string;
}

export interface DemoOrder {
  id: string;
  createdAt: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    apartment?: string;
    city: string;
    state: string;
    pincode: string;
  };
  paymentMethod: 'upi' | 'cod' | 'card';
  status: 'DISPATCH CONFIRMED' | 'PREPARING IN ATELIER';
}

export type SortOption = 'featured' | 'newest' | 'price-low' | 'price-high';

export interface FilterState {
  category: ProductCategory | 'all';
  sizes: ProductSize[];
  minPrice: number;
  maxPrice: number;
  sortBy: SortOption;
  searchQuery: string;
}
