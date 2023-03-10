import { memo } from "react";

import { Loader, LoaderSize } from "@components/Loader/Loader";
import { ProductCard } from "@components/ProductCard/ProductCard";
import WithLinkCard from "@components/WithLinkCard";
import { useListProducts } from "@context/ListProductsContext";
import { observer } from "mobx-react-lite";
import InfiniteScroll from "react-infinite-scroll-component";

import styles from "./ProductList.module.scss";

const ProductList = () => {
  const { list, hasMore, getProducts } = useListProducts();

  const listProductsWithLinks = list.map((product) => (
    <>{WithLinkCard(ProductCard, product)()}</>
  ));

  const getLoader = () => {
    return (
      <Loader
        loading={hasMore}
        size={LoaderSize.l}
        className={styles["product-list__scroll"]}
      ></Loader>
    );
  };

  return (
    <div className={styles["main__product-list"]}>
      <div className={styles["product-list__total"]}>
        <h2 className={styles["product-list__title"]}>Total Product</h2>
        <p className={styles["product-list__number"]}>{list.length}</p>
      </div>
      <InfiniteScroll
        dataLength={list.length}
        next={getProducts}
        hasMore={hasMore}
        loader={getLoader()}
      >
        <div className={styles["product-list__content-with-scroll"]}>
          <div className={styles["product-list__content"]}>
            {listProductsWithLinks}
          </div>
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default observer(ProductList);
