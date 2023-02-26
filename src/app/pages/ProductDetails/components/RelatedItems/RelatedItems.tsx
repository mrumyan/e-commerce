import { useEffect, useState } from "react";

import { Button } from "@components/Button/Button";
import Page from "@components/Page";
import { ProductCard } from "@components/ProductCard/ProductCard";
import axios from "axios";
import { ProductType } from "src/types/api";

import styles from "./RelatedItem.module.scss";

type RelatedItemsProps = {
  category: string | undefined;
};

const RelatedItems: React.FC<RelatedItemsProps> = ({ category }) => {
  const [products, setProducts] = useState<ProductType[] | undefined>();
  const [hasError, setHasError] = useState<boolean>(false);

  const categoryUrl: string = `https://api.escuelajs.co/api/v1/categories/${category}/products`;

  const getProductsByCategory = (): Promise<ProductType[]> =>
    axios.get<ProductType[]>(categoryUrl).then((response) => {
      setHasError(false);
      return response.data;
    });

  const fetchProducts = (): void => {
    getProductsByCategory()
      .then((response) => setProducts(response))
      .catch(() => setHasError(true));
  };

  useEffect(() => {
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
            category={products[i].category.name}
            content={products[i].price && `$${products[i].price}`}
          />
        );
      }
    }
    return result;
  };

  if (hasError) {
    return (
      <>
        <h1>Произошла ошибка, повторите попытку</h1>
        <Button style={{ width: "30%" }} onClick={fetchProducts}>
          Попробовать снова
        </Button>
      </>
    );
  }

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
