import Page from "@components/Page";
import { useParams } from "react-router-dom";

import ProductInfo from "../ProductInfo";
import RelatedItems from "../RelatedItems";

import "./ProductDetails.scss";

const ProductDetails = () => {
  const { id, category } = useParams();

  return (
    <Page>
      <ProductInfo id={id} />
      <RelatedItems category={category} />
    </Page>
  );
};

export default ProductDetails;
