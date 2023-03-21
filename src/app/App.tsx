import { Routes, Route, Navigate } from "react-router-dom";

import ProductDetails from "@pages/ProductDetails/components/ProductDetails";
import Products from "@pages/Products/components/Products";
import { useQueryParamsStoreInit } from "@store/RootStore/hooks/useQueryParamsStoreInit";

const App = () => {
  useQueryParamsStoreInit();

  return (
    <Routes>
      <Route path="/" element={<Products />} />
      <Route path="/product/category/:category/product-id/:id" element={<ProductDetails />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
