import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import styles from "./App.module.scss";
import ProductDetails from "./pages/ProductDetails/components/ProductDetails";
import Products from "./pages/Products/components/Products";

const App = () => {
  return (
    <BrowserRouter>
      <div className={styles.app}>
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/product">
            <Route path=":category/:id" element={<ProductDetails />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
