import { createContext, useContext } from "react";

import CategoryStore from "@store/CategoryStore";

export const CategoryContext = createContext<CategoryStore | undefined>(
  undefined
);

export const useCategory = () => {
  const context = useContext(CategoryContext);
  if (context === undefined) {
    throw new Error("useCategory must be used within a CountProvider");
  }
  return context;
};
