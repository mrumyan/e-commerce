import { ProductCard } from "@components/ProductCard/ProductCard";
import { Link } from "react-router-dom";
import { ProductType } from "src/types/api";

import styles from "./ProductList.module.scss";

type ProductListProps = {
  products: ProductType[];
};

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const productList = products.map((product) => (
    <Link
      className={styles["product-list__item"]}
      key={product.id}
      to={`/product/${product.category.id}/${product.id}`}
    >
      <ProductCard
        title={product.title}
        subtitle={product.description}
        image={product.images[0]}
        category={product.category.name}
        content={`$${product.price}`}
      />
    </Link>
  ));

  return (
    <div className={styles["main__product-list"]}>
      <div className={styles["product-list__total"]}>
        <h2 className={styles["product-list__title"]}>Total Product</h2>
        <p className={styles["product-list__number"]}>{products.length}</p>
      </div>
      <div className={styles["product-list__content"]}>{productList}</div>
    </div>
  );
};

export default ProductList;
