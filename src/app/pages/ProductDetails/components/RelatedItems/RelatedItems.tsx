import { useEffect, useState } from "react";

import { ProductCard } from "@components/ProductCard/ProductCard";
import axios from "axios";
import { ProductType } from "src/types/api";

import styles from "./RelatedItem.module.scss";

type RelatedItemsProps = {
  category: string | undefined;
};

const RelatedItems: React.FC<RelatedItemsProps> = ({ category }) => {
  const [products, setProducts] = useState<ProductType[] | undefined>();

  const categoryUrl: string = `https://api.escuelajs.co/api/v1/categories/${category}/products`;

  const getProductsByCategory = (): Promise<ProductType[]> =>
    axios.get<ProductType[]>(categoryUrl).then((response) => response.data);

  useEffect(() => {
    const fetchProducts = (): void => {
      getProductsByCategory().then((response) => setProducts(response));
    };

    fetchProducts();
  }, []);

  const createrRelatedItems = () => {
    const result = [];
    if (products) {
      for (let i = 0; i < 4; i++) {
        result.push(
          <ProductCard
            key={products[i].id}
            title={products[i].title}
            subtitle={products[i].description}
            image={products[i].images[0]}
          />
        );
      }
    }
    return result;
  };

  return (
    <div className={styles["main__related-items"]}>
      <p className={styles["related-items__title"]}>Related Items</p>
      <div className={styles["related-items__content"]}>
        {products && createrRelatedItems()}
      </div>
    </div>
  );
};

export default RelatedItems;
