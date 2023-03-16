import { Loader, LoaderSize } from "@components/Loader";
import { ProductCard } from "@components/ProductCard";
import { useListProducts } from "@context/ListProductsContext";

import { observer } from "mobx-react-lite";
import InfiniteScroll from "react-infinite-scroll-component";

import styles from "./ProductList.module.scss";

const ProductList = () => {
  const { list, hasMore, getProducts } = useListProducts();

  const getLoader = () => {
    return (
      <Loader
        loading={hasMore}
        size={LoaderSize.l}
        className={styles["product-list__scroll"]}
      />
    );
  };

  return (
    <div className={styles["main__product-list"]}>
      <div className={styles["product-list__total"]}>
        <h2 className={styles["product-list__title"]}>Total Product</h2>
        <div className={styles["product-list__number"]}><span>{list.length}</span></div>
      </div>
      <InfiniteScroll
        dataLength={list.length}
        next={getProducts}
        hasMore={hasMore}
        loader={getLoader()}
      >
        <div className={styles["product-list__content-with-scroll"]}>
          <div className={styles["product-list__content"]}>
            {list.map((product) => (
              <ProductCard product={product} />
            ))}
          </div>
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default observer(ProductList);
