import { useCallback, useEffect, useState } from "react";

import Button from "@components/Button";
import CustomError from "@components/Error";
import axios from "axios";
import { ProductType } from "src/types/api";

import styles from "./ProductInfo.module.scss";
import ProductSlider from "../ProductSlider";

type ProductInfoProps = {
  id?: string;
};

const ProductInfo: React.FC<ProductInfoProps> = ({ id }) => {
  const [product, setProduct] = useState<ProductType | null>(null);
  const [hasError, setHasError] = useState(false);

  const productUrl: string = `https://api.escuelajs.co/api/v1/products/${id}`;

  const fetchProductInfo = useCallback(() => {
    axios
      .get<ProductType>(productUrl)
      .then((response) => {
        setHasError(false);
        setProduct(response.data);
      })
      .catch(() => setHasError(true));
  }, [productUrl]);

  useEffect(fetchProductInfo, [fetchProductInfo]);

  if (hasError) {
    return <CustomError onClick={fetchProductInfo} />;
  } else if (product) {
    return (
      <div className={styles.main__product}>
        <ProductSlider images={product.images} alt={product.title} />
        <div className={styles.product__info}>
          <p className={`${styles.product__item} ${styles.product__title}`}>
            {product.title || ""}
          </p>
          <p className={`${styles.product__item} ${styles.product__subtitle}`}>
            {product.description}
          </p>
          <p className={`${styles.product__item} ${styles.product__content}`}>
            {product.price && `$${product.price}`}
          </p>
          <div className={styles.product__buttons}>
            <Button className={styles.product__buy}>Buy Now</Button>
            <Button className={styles.product__cart}>Add to Cart</Button>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default ProductInfo;
