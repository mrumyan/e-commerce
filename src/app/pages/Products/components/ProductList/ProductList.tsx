import {
  ProductCard,
  ProductCardProps,
} from "@components/ProductCard/ProductCard";

import "./ProductList.css";

type ProductListProps = {
  products: ProductCardProps[];
};

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const productList = products.map((product) => (
    <ProductCard
      id={product.id}
      images={product.images}
      title={product.title}
      description={product.description}
    />
  ));

  console.log("productList", productList);
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
