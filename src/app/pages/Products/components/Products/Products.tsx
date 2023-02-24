import { useEffect, useState } from "react";

import Page from "@components/Page";
import axios from "axios";
import { ProductType } from "src/types/api";

import Filter from "../Filter";
import ProductList from "../ProductList";

import "./Products.css";

const Products = () => {
  const [products, setProducts] = useState<ProductType[]>([]);

  const productsUrl: string =
    "https://api.escuelajs.co/api/v1/products/?categoryId=3";

  const getProducts = (): Promise<ProductType[]> =>
    axios.get<ProductType[]>(productsUrl).then((response) => response.data);

  useEffect(() => {
    const fetchProducts = (): void => {
      getProducts().then((response) => {
        setProducts(response);
      });
    };

    fetchProducts();
  }, []);

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
