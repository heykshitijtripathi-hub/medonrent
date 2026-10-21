'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { EquipmentItem } from '@/data/initialEquipment';

export interface CartItem {
  item: EquipmentItem;
  tenureMonths: number;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: EquipmentItem, tenureMonths: number) => void;
  removeFromCart: (itemId: string) => void;
  updateTenure: (itemId: string, tenure: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = useCallback((item: EquipmentItem, tenureMonths: number) => {
    setCartItems(prev => {
      const existing = prev.find(c => c.item.id === item.id);
      if (existing) {
        return prev.map(c =>
          c.item.id === item.id ? { ...c, tenureMonths } : c
        );
      }
      return [...prev, { item, tenureMonths, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((itemId: string) => {
    setCartItems(prev => prev.filter(c => c.item.id !== itemId));
  }, []);

  const updateTenure = useCallback((itemId: string, tenure: number) => {
    setCartItems(prev =>
      prev.map(c => c.item.id === itemId ? { ...c, tenureMonths: tenure } : c)
    );
  }, []);

  const clearCart = useCallback(() => setCartItems([]), []);

  const cartCount = cartItems.length;
  const cartTotal = cartItems.reduce((sum, c) => {
    const discounts: Record<number, number> = { 1: 0, 3: 5, 6: 10, 12: 15 };
    const disc = discounts[c.tenureMonths] || 0;
    const monthlyRent = Math.round(c.item.monthlyRent * (1 - disc / 100));
    return sum + monthlyRent * c.tenureMonths + c.item.securityDeposit;
  }, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateTenure, clearCart, cartCount, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
