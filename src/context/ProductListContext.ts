import { createContext, useContext } from "react";

import ProductListStore from "@store/ProductListStore";

export const ProductListContext = createContext<ProductListStore | undefined>(
  undefined
);

export const useProductList = () => {
  const context = useContext(ProductListContext);
  if (context === undefined) {
    throw new Error("useProductList must be used within a Provider");
  }
  return context;
};
