import { useEffect, createContext } from "react";

export const CardContext = createContext({});

export const CardProvider = ({ children }: any) => {
  return (
    <CardContext.Provider value={{ items: [], onAddItems: () => {} }}>
      {children}
    </CardContext.Provider>
  );
};
