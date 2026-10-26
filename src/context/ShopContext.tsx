import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, ProductSize, CartItem, DemoOrder } from '../types';

interface ToastState {
  visible: boolean;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface ShopContextType {
  cart: CartItem[];
  wishlist: string[];
  orders: DemoOrder[];
  addOrder: (order: DemoOrder) => void;
  addToCart: (product: Product, size: ProductSize, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  shippingFee: number;
  freeShippingThreshold: number;
  discountAmount: number;
  promoCode: string;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isSizeGuideOpen: boolean;
  setIsSizeGuideOpen: (open: boolean) => void;
  toast: ToastState;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'kult99_streetwear_cart';
const WISHLIST_STORAGE_KEY = 'kult99_streetwear_wishlist';
const ORDERS_STORAGE_KEY = 'kult99_demo_orders';
const FREE_SHIPPING_THRESHOLD = 1499;

export const ShopProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return saved ? JSON.parse(saved) : ['k99-001', 'k99-005'];
    } catch {
      return ['k99-001', 'k99-005'];
    }
  });

  const [orders, setOrders] = useState<DemoOrder[]>(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [promoDiscountRate, setPromoDiscountRate] = useState(0);

  const [toast, setToast] = useState<ToastState>({
    visible: false,
    message: '',
    type: 'success',
  });

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch (e) {
      console.error('Failed to save wishlist to localStorage', e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to save orders to localStorage', e);
    }
  }, [orders]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ visible: true, message, type });
    setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
    }, 3200);
  };

  const addOrder = (order: DemoOrder) => {
    setOrders(prev => [order, ...prev]);
  };

  const addToCart = (product: Product, size: ProductSize, quantity = 1) => {
    const cartItemId = `${product.id}-${size}`;
    setCart(prev => {
      const existing = prev.find(item => item.id === cartItemId);
      if (existing) {
        return prev.map(item =>
          item.id === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { id: cartItemId, product, size, quantity }];
    });
    showToast(`Added ${product.name} [Size: ${size}] to bag`, 'success');
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
    showToast('Removed item from bag', 'info');
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.id === cartItemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setPromoCode('');
    setPromoDiscountRate(0);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from Wishlist', 'info');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Added to Wishlist', 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.includes(productId);
  };

  const applyPromoCode = (code: string) => {
    const formatted = code.trim().toUpperCase();
    if (formatted === 'RAW10' || formatted === 'KULT10') {
      setPromoCode(formatted);
      setPromoDiscountRate(0.10); // 10% off
      showToast('Promo code applied: 10% OFF your order!', 'success');
      return { success: true, message: '10% discount applied successfully!' };
    }
    if (formatted === 'HEAVY20') {
      setPromoCode(formatted);
      setPromoDiscountRate(0.20); // 20% off
      showToast('VIP code applied: 20% OFF!', 'success');
      return { success: true, message: '20% VIP discount applied!' };
    }
    showToast('Invalid promo code. Try "RAW10"', 'error');
    return { success: false, message: 'Invalid code. Try "RAW10"' };
  };

  const removePromoCode = () => {
    setPromoCode('');
    setPromoDiscountRate(0);
    showToast('Promo code removed', 'info');
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const shippingFee = cartSubtotal >= FREE_SHIPPING_THRESHOLD || cartSubtotal === 0 ? 0 : 149;
  const discountAmount = Math.round(cartSubtotal * promoDiscountRate);

  return (
    <ShopContext.Provider
      value={{
        cart,
        wishlist,
        orders,
        addOrder,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        shippingFee,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        discountAmount,
        promoCode,
        applyPromoCode,
        removePromoCode,
        toggleWishlist,
        isInWishlist,
        isCartOpen,
        setIsCartOpen,
        isSearchOpen,
        setIsSearchOpen,
        isSizeGuideOpen,
        setIsSizeGuideOpen,
        toast,
        showToast,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
