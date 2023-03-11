import { useCallback, useEffect } from "react";

import CustomError from "@components/Error";
import Input from "@components/Input";
import Page from "@components/Page";
import { CategoryContext } from "@context/CategoryContext";
import { ListProductsContext } from "@context/ListProductsContext";
import CategoryStore from "@store/CategoryStore";
import ListProductsStore from "@store/ListProductsStore";
import { Meta } from "@utils/meta";
import { useLocalStore } from "@utils/useLocalStore";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

import styles from "./Products.module.scss";
import Filter from "../Filter";
import ProductList from "../ProductList";

const Products = () => {
  const listProductsStore = useLocalStore(() => new ListProductsStore());
  const categoryStore = useLocalStore(() => new CategoryStore());
  let navigate = useNavigate();

  const getProducts = useCallback(listProductsStore.getProducts, []);
  const getCategories = useCallback(categoryStore.getAllCategories, []);

  useEffect(() => {
    getProducts();
    getCategories();
  }, []);

  const setParams = useCallback(
    () => navigate(`?title=${listProductsStore.query}`),
    [listProductsStore.query]
  );

  const onChange = (query: string) => {
    listProductsStore.setQuery(query);
    //navigate(`?title=${listProductsStore.query}`);
    setParams();
  };

  return (
    <ListProductsContext.Provider value={listProductsStore}>
      <Page>
        <h1 className={styles.main__title}>Products</h1>
        <p className={styles.main__subtitle}>
          We display products based on the latest products we have, if you want
          to see our old products please enter the name of the item
        </p>
        <div className={styles.main__search}>
          <Input
            value={listProductsStore.query as string}
            onChange={onChange}
            placeholder="Search by title"
            className={styles.main__input}
          />
          <CategoryContext.Provider value={categoryStore}>
            <Filter />
          </CategoryContext.Provider>
        </div>
        {listProductsStore.meta === Meta.error ? (
          <CustomError onClick={getProducts} />
        ) : (
          <ProductList />
        )}
      </Page>
    </ListProductsContext.Provider>
  );
};

export default observer(Products);
