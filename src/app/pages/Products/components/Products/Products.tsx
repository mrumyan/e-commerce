import { useCallback, useEffect, useState } from "react";

import CustomError from "@components/Error";
import Page from "@components/Page";
import axios from "axios";
import { ProductType } from "src/types/api";

import styles from "./Products.module.scss";
import Filter from "../Filter";
import ProductList from "../ProductList";

const Products = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [hasError, setHasError] = useState<boolean>(false);

  const productsUrl: string = "https://api.escuelajs.co/api/v1/products";

  const fetchProducts = useCallback(() => {
    axios
      .get<ProductType[]>(productsUrl)
      .then((response) => {
        setHasError(false);
        setProducts(response.data);
      })
      .catch(() => setHasError(true));
  }, [productsUrl]);

  useEffect(fetchProducts, [fetchProducts]);

  if (hasError) {
    return <CustomError onClick={fetchProducts} />;
  } else {
    return (
      <Page>
        <h1 className={styles.main__title}>Products</h1>
        <p className={styles.main__subtitle}>
          We display products based on the latest products we have, if you want
          to see our old products please enter the name of the item
        </p>
        <Filter />
        <ProductList products={products} />
      </Page>
    );
  }
};

export default Products;
