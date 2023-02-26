import { useEffect, useRef, useState } from "react";

import { Button } from "@components/Button/Button";
import axios from "axios";
import { ProductType } from "src/types/api";
import "./ProductInfo.css";

type ProductInfoProps = {
  id: string | undefined;
};

const ProductInfo: React.FC<ProductInfoProps> = ({ id }) => {
  const [imageNumber, setImageNumber] = useState<number>(0);
  const [product, setProduct] = useState<ProductType | null>(null);

  const imagesNumber = useRef<number>(3);

  const productUrl: string = `https://api.escuelajs.co/api/v1/products/${id}`;

  const getProductById = (): Promise<ProductType> =>
    axios.get<ProductType>(productUrl).then((response) => response.data);

  useEffect(() => {
    const fetchProduct = (): void => {
      getProductById().then((response) => setProduct(response));
    };

    fetchProduct();
  }, []);

  useEffect(() => {
    if (product) {
      imagesNumber.current = product?.images.length;
    }
  }, [product]);

  const showPrevImage = (): void => {
    product && setImageNumber((prev) => prev - 1);
  };

  const showNextImage = () => {
    product && setImageNumber((prev) => prev + 1);
  };

  return (
    <div className="product">
      <div className="product__slider">
        <button
          className="product__prev"
          disabled={imageNumber === 0}
          onClick={showPrevImage}
        ></button>
        <img
          className="product__image"
          src={product?.images[imageNumber]}
          alt={product?.title}
        />
        <button
          className="product__next"
          disabled={imageNumber === imagesNumber.current - 1}
          onClick={showNextImage}
        ></button>
      </div>
      <div className="product__info">
        <p className="product__item product__title">{product?.title || ""}</p>
        <p className="product__item product__subtitle">
          {product?.description}
        </p>
        <p className="product__item product__content">{`$${product?.price}`}</p>
        <div className="product__buttons">
          <Button className="product__buy">Buy Now</Button>
          <Button className="product__cart">Add to Cart</Button>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
