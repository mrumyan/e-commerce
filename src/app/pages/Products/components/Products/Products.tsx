import { useCallback, useEffect } from "react";

import CustomError from "@components/Error";
import { Input } from "@components/Input/Input";
import Page from "@components/Page";
import { ListProductsContext } from "@context/ListProductsContext";
import ListProductsStore from "@store/ListProductsStore";
import { useLocalStore } from "@utils/useLocalStore";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

import styles from "./Products.module.scss";
import ProductList from "../ProductList";

const Products = () => {
  const listProductsStore = useLocalStore(() => new ListProductsStore());

  let navigate = useNavigate();

  const getProducts = useCallback(listProductsStore.getProducts, []);

  useEffect(getProducts, []);

  const onChange = (query: string) => {
    listProductsStore.setQuery(query);
    navigate(`?title=${listProductsStore.query}`);
  };

  return (
    <ListProductsContext.Provider value={listProductsStore}>
      <Page>
        <h1 className={styles.main__title}>Products</h1>
        <p className={styles.main__subtitle}>
          We display products based on the latest products we have, if you want
          to see our old products please enter the name of the item
        </p>
        <Input
          value={listProductsStore.query as string}
          onChange={onChange}
          placeholder="Search by title"
        />
        {listProductsStore.hasError ? (
          <CustomError onClick={getProducts} />
        ) : (
          <ProductList />
        )}
      </Page>
    </ListProductsContext.Provider>
  );
};

export default observer(Products);
