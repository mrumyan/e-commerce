import { ProductTypeModel } from "@store/models/product";
import React from "react";
import { Link } from "react-router-dom";

import styles from "./ProductCard.module.scss";

type ProductCardProps = {
  product: ProductTypeModel;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { id, title, subtitle, images, categoryId, category, content, onClick } = product;

  return (
    <Link to={`/product/category/${categoryId}/product-id/${id}`}>
      <figure className={styles.card} onClick={onClick}>
        <img
          className={styles.card__image}
          src={images[0]}
          alt={title as string}
        />
        <figcaption className={styles.card__info}>
          <p className={styles.card__category}>{category}</p>
          <p className={styles.card__title}>{title}</p>
          <p className={styles.card__subtitle}>{subtitle}</p>
          <p className={styles.card__content}>{content}</p>
        </figcaption>
      </figure>
    </Link>
  );
};

export default React.memo(ProductCard);