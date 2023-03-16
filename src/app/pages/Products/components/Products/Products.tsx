import { useCallback, useEffect } from "react";
import { observer } from "mobx-react-lite";

import CustomError from "@components/Error";
import Page from "@components/Page";
import { CategoryContext } from "@context/CategoryContext";
import { ListProductsContext } from "@context/ListProductsContext";
import CategoryStore from "@store/CategoryStore";
import ListProductsStore from "@store/ListProductsStore";
import { Meta } from "@utils/meta";
import { useLocalStore } from "@utils/useLocalStore";

import styles from "./Products.module.scss";

import Filter from "../Filter";
import ProductList from "../ProductList";

const Products = () => {
  const listProductsStore = useLocalStore(() => new ListProductsStore());
  const categoryStore = useLocalStore(() => new CategoryStore());

  const getProducts = useCallback(listProductsStore.getProducts, []);
  const getCategories = useCallback(categoryStore.getAllCategories, []);

  useEffect(() => {
    getProducts();
    getCategories();
  }, []);

  return (
    <Page>
      <ListProductsContext.Provider value={listProductsStore}>
        <h1 className={styles.main__title}>Products</h1>
        <p className={styles.main__subtitle}>
          We display products based on the latest products we have, if you want
          to see our old products please enter the name of the item
        </p>
        <CategoryContext.Provider value={categoryStore}>
          <Filter />
        </CategoryContext.Provider>
        {listProductsStore.meta === Meta.error ? (
          <CustomError onClick={getProducts} />
        ) : (
          <ProductList />
        )}
      </ListProductsContext.Provider>
    </Page>
  );
};

export default observer(Products);
