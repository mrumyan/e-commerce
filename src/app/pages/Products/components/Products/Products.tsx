import React, { useCallback, useEffect } from "react";

import CustomError from "@components/Error";
import { Input } from "@components/Input/Input";
import Page from "@components/Page";
import ListProductsStore from "@store/ListProductsStore";
import { useQueryParamsStoreInit } from "@store/RootStore/hooks/useQueryParamsStoreInit";
import { useLocalStore } from "@utils/useLocalStore";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

import styles from "./Products.module.scss";
import ProductList from "../ProductList";

const Products = () => {
  const listProductsStore = useLocalStore(() => new ListProductsStore());

  const getProducts = useCallback(listProductsStore.getProducts, [
    listProductsStore,
  ]);

  useEffect(getProducts, [listProductsStore]);

  const onChange = React.useCallback(
    (query: string) => listProductsStore.setQuery(query),
    [listProductsStore]
  );

  let navigate = useNavigate();
  useEffect(() => {
    navigate(`?title=${listProductsStore.query}`);
  }, [listProductsStore.query]);

  useQueryParamsStoreInit();

  return (
    <Page>
      <h1 className={styles.main__title}>Products</h1>
      <p className={styles.main__subtitle}>
        We display products based on the latest products we have, if you want to
        see our old products please enter the name of the item
      </p>
      <Input
        value={listProductsStore.query}
        onChange={onChange}
        placeholder="Search property"
      />
      {listProductsStore.hasError ? (
        <CustomError onClick={getProducts} />
      ) : (
        <ProductList list={listProductsStore.list} />
      )}
    </Page>
  );
};

export default observer(Products);
