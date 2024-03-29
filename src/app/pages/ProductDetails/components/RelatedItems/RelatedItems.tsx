import { useCallback, useEffect } from "react";

import CustomError from "@components/Error";
import ProductCard from "@components/ProductCard";
import CategoryStore from "@store/CategoryStore";
import { Meta } from "@utils/meta";
import { useLocalStore } from "@utils/useLocalStore";
import { observer } from "mobx-react-lite";

import styles from "./RelatedItem.module.scss";

type RelatedItemsProps = {
  category?: string;
};

const RelatedItems: React.FC<RelatedItemsProps> = ({ category }) => {
  const categoryStore = useLocalStore(() => new CategoryStore());

  const { products, meta } = categoryStore;

  const getRelatedProducts = useCallback(
    () => categoryStore.getProductsByCategory(category),
    []
  );

  useEffect(getRelatedProducts, [categoryStore]);

  if (meta === Meta.error) {
    return <CustomError onClick={getRelatedProducts} />;
  } else {
    return (
      <div className={styles["main__related-items"]}>
        <p className={styles["related-items__title"]}>Related Items</p>
        <div className={styles["related-items__content"]}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    );
  }
};

export default observer(RelatedItems);
