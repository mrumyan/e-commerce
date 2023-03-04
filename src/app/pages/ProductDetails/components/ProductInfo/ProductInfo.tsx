import { useCallback, useEffect } from "react";

import CustomError from "@components/Error";
import { productStore } from "@store/index";
import { observer } from "mobx-react-lite";

import styles from "./ProductInfo.module.scss";
import ProductDescription from "../ProductDescription";
import ProductSlider from "../ProductSlider";

type ProductInfoProps = {
  id?: string;
};

const ProductInfo: React.FC<ProductInfoProps> = ({ id }) => {
  const getProduct = useCallback(() => productStore.getProduct(id), []);

  useEffect(getProduct, [productStore]);

  if (productStore.hasError) {
    return <CustomError onClick={getProduct} />;
  } else if (productStore.product) {
    const { title, subtitle, images, content } = productStore.product;

    return (
      <div className={styles.main__product}>
        <ProductSlider images={images} alt={title} />
        <ProductDescription
          title={title}
          subtitle={subtitle}
          content={content}
        />
      </div>
    );
  } else {
    return null;
  }
};

export default observer(ProductInfo);
