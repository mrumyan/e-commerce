import Loader, { LoaderSize } from "@components/Loader";
import ProductCard from "@components/ProductCard";
import { useListProducts } from "@context/ListProductsContext";

import { observer } from "mobx-react-lite";
import InfiniteScroll from "react-infinite-scroll-component";

import arrow from "@assets/icons/arrow-right.svg";

import styles from "./ProductList.module.scss";
import { useCallback } from "react";

const ProductList = () => {
  const { list, hasMore, getProducts } = useListProducts();

  const getLoader = useCallback(() => {
    return (
      <Loader
        loading={hasMore}
        size={LoaderSize.l}
        className={styles["product-list__loader"]}
      />
    );
  }, []);

  const goToTheTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, []);

  const getEndMessage = useCallback(() => {
    return (
      <div className={styles["product-list__end-icon"]}>
        <img src={arrow} alt="" onClick={goToTheTop} />
      </div>
    );
  }, []);

  return (
    <div className={styles["main__product-list"]}>
      <div className={styles["product-list__total"]}>
        <h2 className={styles["product-list__title"]}>Total Product</h2>
        <div className={styles["product-list__number"]}><span>{list.length}</span></div>
      </div>
      <div className={styles["product-list__scroll"]}>
        <InfiniteScroll
          dataLength={list.length}
          next={getProducts}
          hasMore={hasMore}
          loader={getLoader()}
          endMessage={list.length >= 6 && getEndMessage()}
          style={{ overflow: "hidden" }}
        >
          <div className={styles["product-list__content"]}>
            {list.map((product) => (
              <ProductCard product={product} />
            ))}
          </div>
        </InfiniteScroll>
      </div>

    </div >
  );
};

export default observer(ProductList);
