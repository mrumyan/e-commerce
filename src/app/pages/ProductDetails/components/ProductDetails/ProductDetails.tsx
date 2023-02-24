import Page from "@components/Page";

import ProductInfo from "../ProductInfo";
import RelatedItems from "../RelatedItems";

import "./ProductDetails.css";

const ProductDetails = () => {
  return (
    <Page>
      <ProductInfo />
      <RelatedItems />
    </Page>
  );
};

export default ProductDetails;
