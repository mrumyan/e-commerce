import { ProductCardProps } from "@components/ProductCard/ProductCard";
import { ProductTypeModel } from "@store/models/product";
import { Link } from "react-router-dom";

import styles from "./WithLinkCard.module.scss";

export const WithLinkCard = (
  Component: React.FC<ProductCardProps>,
  product: ProductTypeModel
) => {
  const WithLinkCardComponent = () => {
    return (
      <Link
        className={styles["product-list__item"]}
        key={product.id}
        to={`/product/${product?.categoryId}/${product.id}`}
      >
        <Component key={product.id} product={product} />
      </Link>
    );
  };
  return WithLinkCardComponent;
};

export default WithLinkCard;
