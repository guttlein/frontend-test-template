'use client';
import { createContext, useContext, useEffect, useState } from 'react';

export type Game = {
  id: string;
  name: string;
  description: string;
  genre: string;
  image: string;
  price: number;
  isNew: boolean;
};

const STORAGE_KEY = 'cartItems';

type CartContextType = {
  cartItems: Game[];
  addToCart: (game: Game) => void;
  removeFromCart: (id: string) => void;
  isInCart: (id: string) => boolean;
  getTotal: () => number;
  itemCount: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<Game[]>([]);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setCartItems(JSON.parse(stored));
    }
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (initialized) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
    }
  }, [cartItems, initialized]);

  const addToCart = (game: Game) => {
    setCartItems((prev) => [...prev, game]);
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((g) => g.id !== id));
  };

  const isInCart = (id: string) => cartItems.some((g) => g.id === id);

  const getTotal = () => cartItems.reduce((sum, game) => sum + game.price, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        isInCart,
        getTotal,
        itemCount: cartItems.length,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
