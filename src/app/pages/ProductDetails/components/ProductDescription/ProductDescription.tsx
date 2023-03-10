import Button from "@components/Button";
import cn from "classnames";

import styles from "./ProductDescription.module.scss";

type ProductDescriptionProps = {
  title: string;
  subtitle: string;
  content?: string;
};

const ProductDescription: React.FC<ProductDescriptionProps> = ({
  title,
  subtitle,
  content,
}) => {
  const titleClassNames = cn(styles.product__item, styles.product__title);
  const subtitleClassNames = cn(styles.product__item, styles.product__subtitle);
  const contentClassNames = cn(styles.product__item, styles.product__content);

  return (
    <div className={styles.product__info}>
      <p className={titleClassNames}>{title}</p>
      <p className={subtitleClassNames}>{subtitle}</p>
      <p className={contentClassNames}>{content}</p>
      <div className={styles.product__buttons}>
        <Button className={styles.product__buy}>Buy Now</Button>
        <Button className={styles.product__cart}>Add to Cart</Button>
      </div>
    </div>
  );
};

export default ProductDescription;
