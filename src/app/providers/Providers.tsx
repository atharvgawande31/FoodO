import { useEffect, createContext, useContext, useState } from "react";
import { CartItem, Product } from "@assets/types";


   const [items, setItems] = useState<CartItem[]>([]) 

      type CardType = {
    items: CartItem,
    addItem : (product: Product, size: CartItem['size']) => void
    }

    const CardContext = createContext<CardType>({
        items: [],
        addItem: () => {}
    });


export const CardProvider = ({ children }: any) => {

const addItem = (product: Product, size: CartItem['size']) => {

} 
  return (
    <CardContext.Provider value={{ items , addItem }}>
      {children}
    </CardContext.Provider>
  );
};
export const useCart = () => useContext(CardContext);
