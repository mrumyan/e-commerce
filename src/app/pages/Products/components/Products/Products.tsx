import React, { useCallback, useEffect } from "react";

import CustomError from "@components/Error";
import { Input } from "@components/Input/Input";
import Page from "@components/Page";
import { listProductsStore } from "@store/index";
import { observer } from "mobx-react-lite";

import styles from "./Products.module.scss";
import Filter from "../Filter";
import ProductList from "../ProductList";

const Products = () => {
  const [value, setValue] = React.useState("");

  const handleChangeValue = React.useCallback(
    (value: string) => setValue(value),
    []
  );

  const getProducts = useCallback(listProductsStore.getProducts, []);

  useEffect(getProducts, [listProductsStore]);

  return (
    <Page>
      <h1 className={styles.main__title}>Products</h1>
      <p className={styles.main__subtitle}>
        We display products based on the latest products we have, if you want to
        see our old products please enter the name of the item
      </p>
      {/* <Filter /> */}
      <Input value={value} onChange={handleChangeValue} />
      {listProductsStore.hasError ? (
        <CustomError onClick={getProducts} />
      ) : (
        <ProductList list={listProductsStore.list} />
      )}
    </Page>
  );
};

export default observer(Products);
