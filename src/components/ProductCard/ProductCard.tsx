import { ProductTypeModel } from "@store/models/product";

import styles from "./ProductCard.module.scss";

export type ProductCardProps = {
  product: ProductTypeModel;
};

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { title, subtitle, images, category, content, onClick } = product;

  return (
    <figure className={styles.card} onClick={onClick}>
      <img
        className={styles.card__image}
        src={images[0]}
        alt={title as string}
      />
      <figcaption className={styles.card__info}>
        <p className={`${styles.card__item} ${styles.card__category}`}>
          {category}
        </p>
        <p className={`${styles.card__item} ${styles.card__title}`}>{title}</p>
        <p className={`${styles.card__item} ${styles.card__subtitle}`}>
          {subtitle}
        </p>
        <p className={`${styles.card__item} ${styles.card__content}`}>
          {content}
        </p>
      </figcaption>
    </figure>
  );
};
