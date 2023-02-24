import { ProductCard } from "@components/ProductCard/ProductCard";
import { ProductType } from "src/types/api";

import "./ProductList.css";

type ProductListProps = {
  products: ProductType[];
};

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const productList = products.map((product) => (
    <ProductCard
      key={product.id}
      title={product.title}
      subtitle={product.description}
      image={product.images[0]}
      category={product.category.name}
      content={`$${product.price}`}
    />
  ));

  return (
    <div className="main__product-list">
      <div className="product-list__total">
        <h2 className="product-list__title">Total Product</h2>
        <p className="product-list__number">{products.length}</p>
      </div>
      <div className="product-list__content">{productList}</div>
    </div>
  );
};

export default ProductList;
