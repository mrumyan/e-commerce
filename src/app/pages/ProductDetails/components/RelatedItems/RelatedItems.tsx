import { useCallback, useEffect } from "react";

import CustomError from "@components/Error";
import { ProductCard } from "@components/ProductCard/ProductCard";
import { categoryStore } from "@store/index";
import { observer } from "mobx-react-lite";

import styles from "./RelatedItem.module.scss";

type RelatedItemsProps = {
  category?: string;
};

const RelatedItems: React.FC<RelatedItemsProps> = ({ category }) => {
  const getRelatedProducts = useCallback(
    () => categoryStore.getProductsByCategory(category),
    []
  );

  useEffect(getRelatedProducts, [categoryStore]);

  const relatedProductsList = categoryStore.products.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));

  if (categoryStore.hasError) {
    return <CustomError onClick={getRelatedProducts} />;
  } else {
    return (
      <div className={styles["main__related-items"]}>
        <p className={styles["related-items__title"]}>Related Items</p>
        <div className={styles["related-items__content"]}>
          {relatedProductsList}
        </div>
      </div>
    );
  }
};

export default observer(RelatedItems);
