import { createContext, useContext, useState } from "react";
import { CartItem, Product } from "@assets/types";

// Define the type for the cart context
type CartType = {
  items: CartItem[];
  addItem: (product: Product, size: CartItem["size"]) => void;
};

// Create context with default values
const CartContext = createContext<CartType>({
  items: [],
  addItem: () => {},
});

// Provider component
export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (product: Product, size: CartItem["size"]) => {
    const newCartItem: CartItem = {
      id: String(items.length + 1), // unique id
      product_id: product.id,
      size,
      product,
      quantity: 1,
    };
    setItems([...items, newCartItem]);
  };

  return (
    <CartContext.Provider value={{ items, addItem }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook to use cart anywhere
export const useCart = () => useContext(CartContext);