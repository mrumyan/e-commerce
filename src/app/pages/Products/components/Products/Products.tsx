import { useEffect, useState } from "react";

import { Button } from "@components/Button/Button";
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

  const getProducts = (): Promise<ProductType[]> =>
    axios.get<ProductType[]>(productsUrl).then((response) => {
      setHasError(false);
      return response.data;
    });

  const fetchProducts = (): void => {
    getProducts()
      .then((response) => setProducts(response))
      .catch(() => setHasError(true));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (hasError) {
    return (
      <Page>
        <h1>Произошла ошибка, повторите попытку</h1>
        <Button style={{ width: "30%" }} onClick={fetchProducts}>
          Попробовать снова
        </Button>
      </Page>
    );
  }

  return (
    <Page>
      <h1 className={styles.main__title}>Products</h1>
      <p className={styles.main__subtitle}>
        We display products based on the latest products we have, if you want to
        see our old products please enter the name of the item
      </p>
      <Filter />
      <ProductList products={products} />
    </Page>
  );
};

export default Products;
