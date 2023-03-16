// import { ProductCardProps } from "@components/ProductCard";
import { ProductTypeModel } from "@store/models/product";
import { useCallback, useEffect } from "react";
import { Link } from "react-router-dom";

import styles from "./WithLinkCard.module.scss";

const WithLinkCard = (
  // Component: React.FC<ProductCardProps>,
  // product: ProductTypeModel
) => {
  // const WithLinkCardComponent = () => {
  //   const { categoryId, id } = product;

  //   return (
  //     <Link
  //       className={styles["product-list__item"]}
  //       key={id}
  //       to={`/product/${categoryId}/${id}`}
  //     >
  //       <Component key={id} product={product} />
  //     </Link>
  //   );
  // };
  // return WithLinkCardComponent;
};

export default WithLinkCard;
