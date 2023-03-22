import Button from "@components/Button";
import { useProduct } from "@context/ProductContext";
import cn from "classnames";

import styles from "./ProductDescription.module.scss";

const ProductDescription: React.FC = () => {
  const { product } = useProduct();
  if (!product) {
    return null;
  }

  const { title, subtitle, content } = product;

  const titleClassNames = cn(styles.product__item, styles.product__title);
  const subtitleClassNames = cn(styles.product__item, styles.product__subtitle);
  const contentClassNames = cn(styles.product__item, styles.product__content);

  return (
    <div className={styles.product__info}>
      <div className={styles["product__info-block"]}>
        <p className={titleClassNames}>{title}</p>
        <p className={subtitleClassNames}>{subtitle}</p>
      </div>
      <div className={styles["product__info-block"]}>
        <p className={contentClassNames}>{content}</p>
        <div className={styles.product__buttons}>
          <Button className={styles.product__buy} disabled>Buy Now</Button>
          <Button className={styles.product__cart} disabled>Add to Cart</Button>
        </div></div>

    </div>
  );
};

export default ProductDescription;
