"use client";

import {
  CART_STORAGE_KEY,
  clampQuantity,
  parseStoredCart,
  type CartLine,
} from "@/lib/cart";
import {
  createContext,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";

const EMPTY_CART = "[]";
const CART_EVENT = "gps-cart-change";

function subscribe(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(CART_EVENT, onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(CART_EVENT, onStoreChange);
  };
}

function readCart() {
  return window.localStorage.getItem(CART_STORAGE_KEY) ?? EMPTY_CART;
}

function getServerSnapshot() {
  return EMPTY_CART;
}

function writeCart(lines: CartLine[]) {
  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(lines));
  window.dispatchEvent(new Event(CART_EVENT));
}

type CartContextValue = {
  lines: CartLine[];
  count: number;
  addItem: (productId: string, quantity?: number) => void;
  setQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const raw = useSyncExternalStore(subscribe, readCart, getServerSnapshot);
  const lines = useMemo(() => parseStoredCart(raw), [raw]);

  const value = useMemo<CartContextValue>(() => {
    const count = lines.reduce((sum, line) => sum + line.quantity, 0);
    return {
      lines,
      count,
      addItem: (productId, quantity = 1) => {
        const existing = lines.find((line) => line.productId === productId);
        const next = existing
          ? lines.map((line) =>
              line.productId === productId
                ? { ...line, quantity: clampQuantity(line.quantity + quantity) }
                : line,
            )
          : [...lines, { productId, quantity: clampQuantity(quantity) }];
        writeCart(next);
      },
      setQuantity: (productId, quantity) => {
        writeCart(
          lines.map((line) =>
            line.productId === productId
              ? { ...line, quantity: clampQuantity(quantity) }
              : line,
          ),
        );
      },
      removeItem: (productId) => {
        writeCart(lines.filter((line) => line.productId !== productId));
      },
      clear: () => {
        if (lines.length === 0) return;
        writeCart([]);
      },
    };
  }, [lines]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
