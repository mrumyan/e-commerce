import { useCallback, useEffect } from "react";
import { observer } from "mobx-react-lite";

import CustomError from "@components/Error";
import Page from "@components/Page";
import { CategoryContext } from "@context/CategoryContext";
import { ProductListContext } from "@context/ProductListContext";
import CategoryStore from "@store/CategoryStore";
import ProductListStore from "@store/ProductListStore";
import { Meta } from "@utils/meta";
import { useLocalStore } from "@utils/useLocalStore";

import styles from "./Products.module.scss";

import Filter from "./components/Filter";
import ProductList from "./components/ProductList";

const Products = () => {
  const productListStore = useLocalStore(() => new ProductListStore());
  const categoryStore = useLocalStore(() => new CategoryStore());

  const getProducts = useCallback(productListStore.getProducts, []);
  const getCategories = useCallback(categoryStore.getAllCategories, []);

  useEffect(() => {
    getProducts();
    getCategories();
  }, []);

  return (
    <Page>
      <ProductListContext.Provider value={productListStore}>
        <h1 className={styles.main__title}>Products</h1>
        <p className={styles.main__subtitle}>
          We display products based on the latest products we have, if you want
          to see our old products please enter the name of the item
        </p>
        <CategoryContext.Provider value={categoryStore}>
          <Filter />
        </CategoryContext.Provider>
        {productListStore.meta === Meta.error ? (
          <CustomError onClick={getProducts} />
        ) : (
          <ProductList />
        )}
      </ProductListContext.Provider>
    </Page>
  );
};

export default observer(Products);
