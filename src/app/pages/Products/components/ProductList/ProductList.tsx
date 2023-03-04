import { memo } from "react";

import { ProductCard } from "@components/ProductCard/ProductCard";
import WithLinkCard from "@components/WithLinkCard";
import { ProductTypeModel } from "@store/models/product/productType";

import styles from "./ProductList.module.scss";

type ProductListProps = {
  list: ProductTypeModel[];
};

const ProductList: React.FC<ProductListProps> = ({
  list,
}: ProductListProps) => {
  const productList = list.map((product) => (
    <>{WithLinkCard(ProductCard, product)()}</>
  ));

  return (
    <div className={styles["main__product-list"]}>
      <div className={styles["product-list__total"]}>
        <h2 className={styles["product-list__title"]}>Total Product</h2>
        <p className={styles["product-list__number"]}>{list.length}</p>
      </div>
      <div className={styles["product-list__content"]}>{productList}</div>
    </div>
  );
};

export default memo(ProductList);
