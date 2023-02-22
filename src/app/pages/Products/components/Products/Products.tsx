import { useEffect, useState } from "react";

import Page from "@components/Page";
import { ProductCardProps } from "@components/ProductCard/ProductCard";
import axios from "axios";

import Filter from "../Filter";
import "./Products.css";
import ProductList from "../ProductList";

// type ProductType = {
//   id: number;
//   title: string;
//   description: string;
//   images: string[];
// };

const Products = () => {
  const [products, setProducts] = useState<ProductCardProps[]>([]);
  const productsUrl: string =
    "https://api.escuelajs.co/api/v1/products/?categoryId=3";

  //    const products: ProductCardProps[] = [];
  const getProducts = () =>
    axios
      .get<ProductCardProps[]>(productsUrl)
      .then((response) => response.data);

  const fetchProducts = () => {
    getProducts().then((response) => {
      setProducts(response);
    });
  };

  useEffect(() => fetchProducts(), []);

  console.log("products", products);

  return (
    <Page>
      <div>
        <h1 className="main__title">Products</h1>
        <p className="main__subtitle">
          We display products based on the latest products we have, if you want
          to see our old products please enter the name of the item
        </p>
        <Filter />
        <ProductList products={products} />
      </div>
    </Page>
  );
};

export default Products;
