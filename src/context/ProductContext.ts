import { createContext, useContext } from "react";

import ProductStore from "@store/ProductStore";

export const ProductContext = createContext<ProductStore | undefined>(
  undefined
);

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProduct must be used within a Provider");
  }
  return context;
};
