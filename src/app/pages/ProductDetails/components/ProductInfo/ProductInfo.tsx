import { useEffect, useRef, useState } from "react";

import { Button } from "@components/Button/Button";
import axios from "axios";
import { ProductType } from "src/types/api";

import styles from "./ProductInfo.module.scss";

type ProductInfoProps = {
  id: string | undefined;
};

const ProductInfo: React.FC<ProductInfoProps> = ({ id }) => {
  const [imageNumber, setImageNumber] = useState<number>(0);
  const [product, setProduct] = useState<ProductType | null>(null);
  const [hasError, setHasError] = useState<boolean>(false);

  const imagesNumber = useRef<number>(3);

  const productUrl: string = `https://api.escuelajs.co/api/v1/products/${id}`;

  const getProductById = (): Promise<ProductType> =>
    axios.get<ProductType>(productUrl).then((response) => {
      setHasError(false);
      return response.data;
    });

  const fetchProduct = (): void => {
    getProductById()
      .then((response) => setProduct(response))
      .catch(() => setHasError(true));
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  useEffect(() => {
    if (product) {
      imagesNumber.current = product?.images.length;
    }
  }, [product]);

  const showPrevImage = (): void => {
    product && setImageNumber((prev) => prev - 1);
  };

  const showNextImage = () => {
    product && setImageNumber((prev) => prev + 1);
  };

  if (hasError) {
    return (
      <>
        <h1>Произошла ошибка, повторите попытку</h1>
        <Button style={{ width: "30%" }} onClick={fetchProduct}>
          Попробовать снова
        </Button>
      </>
    );
  }

  return (
    <div className={styles.main__product}>
      <div className={styles.product__slider}>
        <button
          className={styles.product__prev}
          disabled={imageNumber === 0}
          onClick={showPrevImage}
        ></button>
        <img
          className={styles.product__image}
          src={product?.images[imageNumber]}
          alt={product?.title}
        />
        <button
          className={styles.product__next}
          disabled={imageNumber === imagesNumber.current - 1}
          onClick={showNextImage}
        ></button>
      </div>
      <div className={styles.product__info}>
        <p className={`${styles.product__item} ${styles.product__title}`}>
          {product?.title || ""}
        </p>
        <p className={`${styles.product__item} ${styles.product__subtitle}`}>
          {product?.description}
        </p>
        <p className={`${styles.product__item} ${styles.product__content}`}>
          {product?.price && `$${product?.price}`}
        </p>
        <div className={styles.product__buttons}>
          <Button className={styles.product__buy}>Buy Now</Button>
          <Button className={styles.product__cart}>Add to Cart</Button>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
