import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Product } from "@/lib/crestmark-products";
import { products } from "@/lib/crestmark-products";

type CartLine = {
  productId: string;
  packSize: string;
  quantity: number;
};

type AddToCartInput = {
  product: Product;
  packSize: string;
  quantity: number;
};

type CartContextValue = {
  lines: CartLine[];
  addToCart: (item: AddToCartInput) => void;
  updateQuantity: (productId: string, packSize: string, quantity: number) => void;
  removeFromCart: (productId: string, packSize: string) => void;
  clearCart: () => void;
  itemCount: number;
  orderTotal: number | null;
};

const CART_STORAGE_KEY = "crestmark-cart";

const CartContext = createContext<CartContextValue | undefined>(undefined);

function normalizeLines(lines: CartLine[]) {
  return lines
    .filter((line) => products.some((product) => product.id === line.productId))
    .map((line) => ({ ...line, quantity: Math.max(1, Math.min(99, Math.floor(line.quantity || 1))) }));
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(CART_STORAGE_KEY);
      if (!stored) return;
      const parsed = JSON.parse(stored) as CartLine[];
      if (Array.isArray(parsed)) {
        setLines(normalizeLines(parsed));
      }
    } catch {
      setLines([]);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(lines));
  }, [lines]);

  const addToCart = ({ product, packSize, quantity }: AddToCartInput) => {
    setLines((current) => {
      const nextQuantity = Math.max(1, Math.min(99, Math.floor(quantity || 1)));
      const match = current.find(
        (line) => line.productId === product.id && line.packSize === packSize,
      );

      if (!match) {
        return [...current, { productId: product.id, packSize, quantity: nextQuantity }];
      }

      return current.map((line) =>
        line.productId === product.id && line.packSize === packSize
          ? { ...line, quantity: Math.min(99, line.quantity + nextQuantity) }
          : line,
      );
    });
  };

  const updateQuantity = (productId: string, packSize: string, quantity: number) => {
    setLines((current) =>
      current
        .map((line) =>
          line.productId === productId && line.packSize === packSize
            ? { ...line, quantity: Math.max(0, Math.min(99, Math.floor(quantity || 0))) }
            : line,
        )
        .filter((line) => line.quantity > 0),
    );
  };

  const removeFromCart = (productId: string, packSize: string) => {
    setLines((current) =>
      current.filter((line) => line.productId !== productId || line.packSize !== packSize),
    );
  };

  const clearCart = () => setLines([]);

  const value = useMemo<CartContextValue>(() => {
    const itemCount = lines.reduce((total, line) => total + line.quantity, 0);
    const pricedTotal = lines.reduce<number | null>((total, line) => {
      const product = products.find((item) => item.id === line.productId);
      if (!product || product.price === null || total === null) return null;
      return total + product.price * line.quantity;
    }, 0);

    return {
      lines,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      itemCount,
      orderTotal: pricedTotal,
    };
  }, [lines]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}
