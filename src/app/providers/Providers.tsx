import products from "@assets/data/products";
import { CartItem, Product } from "@assets/types";
import { randomUUID } from "expo-crypto";
import { createContext, useContext, useState } from "react";

// Define the type for the cart context
type CartType = {
  items: CartItem[];
  addItem: (product: Product, size: CartItem["size"]) => void;
  updateQuantity: (itemId: string, quantity: -1 | 1) => void;
  total: string
};

// Create context with default values
const CartContext = createContext<CartType>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
  total: "0"
});



// Provider component
export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (product: Product, size: CartItem["size"]) => {
    const existingItem = items.find(
      (item) => item.product === product && item.size === size
    );
    if (existingItem) {
      updateQuantity(existingItem.id, 1);
      return;
    }

    const newCartItem: CartItem = {
      id: randomUUID(),
      product_id: product.id,
      size,
      product,
      quantity: 1,
    };
    setItems([...items, newCartItem]);
  };

  const updateQuantity = (itemId: string, amount: -1 | 1) => {
    const updatedItem = items
      .map((item) =>
        item.id !== itemId
          ? item
          : { ...item, quantity: item.quantity + amount }
      )
      .filter((item) => item.quantity > 0);
    setItems(updatedItem);
  };

  const total = (items.reduce((sum, item) => (sum += item.product.price * item.quantity), 0).toFixed(2))
  

  return (
    <CartContext.Provider value={{ items, addItem, updateQuantity ,total }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook to use cart anywhere
export const useCart = () => useContext(CartContext);
