import styles from "./ProductCard.module.scss";

export type ProductCardProps = {
  title: React.ReactNode;
  subtitle: React.ReactNode;
  image: string;
  category?: string;
  content?: React.ReactNode;
  onClick?: React.MouseEventHandler;
};

export const ProductCard: React.FC<ProductCardProps> = ({
  title,
  subtitle,
  image,
  category,
  content,
  onClick,
}) => {
  return (
    <figure className={styles.card} onClick={onClick}>
      <img className={styles.card__image} src={image} alt={title as string} />
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
