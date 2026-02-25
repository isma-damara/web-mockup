"use client";

import { useEffect, useRef, useState } from "react";

export type CartItem = { id: number; qty: number; size: string };

const STORAGE_KEY = "ecom_cart";

function normalizeCart(items: CartItem[]): CartItem[] {
  return items
    .map((item) => ({
      id: Number(item.id),
      qty: Number(item.qty),
      size: String(item.size),
    }))
    .filter((item) => Number.isFinite(item.id) && Number.isFinite(item.qty) && item.qty > 0);
}

function readCartFromStorage(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartItem[];
    return Array.isArray(parsed) ? normalizeCart(parsed) : [];
  } catch {
    return [];
  }
}

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>(() => readCartFromStorage());
  const hydratedRef = useRef(false);

  useEffect(() => {
    const latest = readCartFromStorage();
    setCart(latest);
    hydratedRef.current = true;
  }, []);

  useEffect(() => {
    if (!hydratedRef.current) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const setAndPersist = (updater: (prev: CartItem[]) => CartItem[]) => {
    setCart((prev) => {
      const next = updater(prev);
      const normalized = normalizeCart(next);
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
      } catch {
        // ignore storage errors
      }
      return normalized;
    });
  };

  const addToCart = (id: number, size: string) => {
    setAndPersist((prev) => {
      const existing = prev.find((c) => c.id === id && c.size === size);
      if (existing) {
        return prev.map((c) => c.id === id && c.size === size ? { ...c, qty: c.qty + 1 } : c);
      }
      return [...prev, { id, qty: 1, size }];
    });
  };

  const updateQty = (id: number, size: string, delta: number) => {
    setAndPersist((prev) =>
      prev
        .map((c) => c.id === id && c.size === size ? { ...c, qty: c.qty + delta } : c)
        .filter((c) => c.qty > 0),
    );
  };

  const removeFromCart = (id: number, size: string) => {
    setAndPersist((prev) => prev.filter((c) => !(c.id === id && c.size === size)));
  };

  const updateSize = (id: number, fromSize: string, toSize: string) => {
    setAndPersist((prev) => {
      const moving = prev.find((c) => c.id === id && c.size === fromSize);
      if (!moving) return prev;
      const without = prev.filter((c) => !(c.id === id && c.size === fromSize));
      const existing = without.find((c) => c.id === id && c.size === toSize);
      if (existing) {
        return without.map((c) =>
          c.id === id && c.size === toSize ? { ...c, qty: c.qty + moving.qty } : c,
        );
      }
      return [...without, { ...moving, size: toSize }];
    });
  };

  const clearCart = () => {
    setAndPersist(() => []);
  };

  return {
    cart,
    addToCart,
    updateQty,
    removeFromCart,
    updateSize,
    clearCart,
  };
}
