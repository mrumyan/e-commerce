import { createContext, useContext } from "react";

import ListProductsStore from "@store/ListProductsStore";

export const ListProductsContext = createContext<ListProductsStore | undefined>(
  undefined
);

export const useListProducts = () => {
  const context = useContext(ListProductsContext);
  if (context === undefined) {
    throw new Error("useListProducts must be used within a Provider");
  }
  return context;
};
