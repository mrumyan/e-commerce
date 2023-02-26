import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProductDetails from "./pages/ProductDetails/components/ProductDetails";
import Products from "./pages/Products/components/Products";

import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/product">
            <Route path=":category/:id" element={<ProductDetails />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
