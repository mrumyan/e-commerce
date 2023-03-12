import { useCallback, useEffect } from "react";

import CustomError from "@components/Error";
import ProductStore from "@store/ProductStore";
import { useLocalStore } from "@utils/useLocalStore";
import { observer } from "mobx-react-lite";

import styles from "./ProductInfo.module.scss";
import ProductDescription from "../ProductDescription";
import ProductSlider from "../ProductSlider";
import { Meta } from "@utils/meta";
import { ProductContext } from "@context/ProductContext";

type ProductInfoProps = {
  id?: string;
};

const ProductInfo: React.FC<ProductInfoProps> = ({ id }) => {
  const productStore = useLocalStore(() => new ProductStore());

  const getProduct = useCallback(() => productStore.getProduct(id), []);

  useEffect(getProduct, []);

  if (productStore.meta === Meta.error) {
    return <CustomError onClick={getProduct} />;
  } else {
    return (
      <ProductContext.Provider value={productStore}>
        <div className={styles.main__product}>
          <ProductSlider />
          <ProductDescription />
        </div>
      </ProductContext.Provider>
    );
  }
};

export default observer(ProductInfo);
