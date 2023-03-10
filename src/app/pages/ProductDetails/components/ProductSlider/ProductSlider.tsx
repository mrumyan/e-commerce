import { useCallback, useRef, useState } from "react";

import styles from "./ProductSlider.module.scss";

type ProductSliderProps = {
  images: string[];
  alt: string;
};

const ProductSlider: React.FC<ProductSliderProps> = ({ images, alt }) => {
  const [currentImageNumber, setCurrentImageNumber] = useState(0);

  let imagesNumber = useRef(3);
  imagesNumber.current = images.length;

  const showPrevImage = useCallback(() => {
    setCurrentImageNumber((prev) => prev - 1);
  }, []);

  const showNextImage = useCallback(() => {
    setCurrentImageNumber((prev) => prev + 1);
  }, []);

  return (
    <div className={styles.product__slider}>
      <button
        className={styles.product__prev}
        disabled={currentImageNumber === 0}
        onClick={showPrevImage}
      ></button>
      <img
        className={styles.product__image}
        src={images[currentImageNumber]}
        alt={alt}
      />
      <button
        className={styles.product__next}
        disabled={currentImageNumber === imagesNumber.current - 1}
        onClick={showNextImage}
      ></button>
    </div>
  );
};

export default ProductSlider;
