import { useLocation } from "react-router-dom";

import rootStore from "../instance";

export const useQueryParamsStoreInit = (): void => {
  const { search, pathname } = useLocation();
  if (!pathname.includes("product")) {
    rootStore.queryParamsStore.setSearch(search);
  }
};
