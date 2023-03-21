import { useProduct } from "@context/ProductContext";
import { useCallback, useRef, useState } from "react";

import arrow from "@assets/icons/arrow-right.svg";

import styles from "./ProductSlider.module.scss";

const ProductSlider: React.FC = () => {
  const { product } = useProduct();

  const [currentImageNumber, setCurrentImageNumber] = useState(0);

  const imagesNumber = useRef(3);

  const showPrevImage = useCallback(() => {
    setCurrentImageNumber((prev) => prev - 1);
  }, []);

  const showNextImage = useCallback(() => {
    setCurrentImageNumber((prev) => prev + 1);
  }, []);

  if (!product) {
    return null;
  }

  const { title, images } = product;
  imagesNumber.current = images.length;

  return (
    <div className={styles.product__slider}>
      <button
        className={styles.product__prev}
        disabled={currentImageNumber === 0}
        onClick={showPrevImage}
      ><img src={arrow} alt="" />
      </button>
      <img
        className={styles.product__image}
        src={images[currentImageNumber]}
        alt={title}
      />
      <button
        className={styles.product__next}
        disabled={currentImageNumber === imagesNumber.current - 1}
        onClick={showNextImage}
      ><img src={arrow} alt="" /></button>
    </div>
  );
};

export default ProductSlider;
