import { useCallback, useEffect, useState } from "react";

import CustomError from "@components/Error";
import { ProductCard } from "@components/ProductCard/ProductCard";
import axios from "axios";
import { ProductType } from "src/types/api";

import styles from "./RelatedItem.module.scss";

type RelatedItemsProps = {
  category?: string;
};

const SHOWN_ITEM_NUMBERS = 4;

const RelatedItems: React.FC<RelatedItemsProps> = ({ category }) => {
  const [relatedItems, setRelatedItems] = useState<ProductType[]>([]);
  const [hasError, setHasError] = useState<boolean>(false);

  const categoryUrl: string = `https://api.escuelajs.co/api/v1/categories/${category}/products`;

  const fetchRelatedItems = useCallback(() => {
    axios
      .get<ProductType[]>(categoryUrl)
      .then((response) => {
        setHasError(false);
        setRelatedItems(response.data.slice(0, SHOWN_ITEM_NUMBERS));
      })
      .catch(() => setHasError(true));
  }, [categoryUrl]);

  useEffect(fetchRelatedItems, [fetchRelatedItems]);

  if (hasError) {
    return <CustomError onClick={fetchRelatedItems} />;
  } else {
    return (
      <div className={styles["main__related-items"]}>
        <p className={styles["related-items__title"]}>Related Items</p>
        <div className={styles["related-items__content"]}>
          {relatedItems.map((item) => (
            <ProductCard
              key={item.id}
              title={item.title}
              subtitle={item.description}
              image={item.images[0]}
              category={item.category.name}
              content={item.price && `$${item.price}`}
            />
          ))}
        </div>
      </div>
    );
  }
};

export default RelatedItems;
