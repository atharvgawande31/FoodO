import { CartItem, Product } from "@assets/types";
import { randomUUID } from "expo-crypto"
import { createContext, useContext, useState } from "react";
import { Router } from "expo-router";
import { Route } from "expo-router/build/Route";


// Define the type for the cart context
type CartType = {
  items: CartItem[];
  addItem: (product: Product, size: CartItem["size"]) => void;
  updateQuantity: (itemId: string, quantity: -1 | 1 ) => void
};

// Create context with default values
const CartContext = createContext<CartType>({
  items: [],
  addItem: () => {},
  updateQuantity : () => {}
});

// Provider component
export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
   
  const addItem = (product: Product, size: CartItem["size"]) => {
    const newCartItem: CartItem = {
      id: randomUUID(),
      product_id: product.id,
      size,
      product,
      quantity: 1,
    };
    setItems([...items, newCartItem]);
  };

const updateQuantity = (itemId: string,amount: -1 | 1  )  => {
     const updatedItem = items.map(item => item.id !== itemId ? item : {...item , quantity: item.quantity + amount}) 
    setItems(updatedItem)
    
  }
     

  return (
    <CartContext.Provider value={{ items, addItem, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook to use cart anywhere
export const useCart = () => useContext(CartContext);