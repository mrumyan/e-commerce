import { Button } from "@components/Button/Button";
import "./ProductInfo.css";

const ProductInfo = () => {
  return (
    <div className="product">
      <div className="product__image">
        <img
          src="https://s3-alpha-sig.figma.com/img/8471/6a9f/a3d3ee62b367357b71eec92436996e70?Expires=1678060800&Signature=BnW~a4h4XGsDzpIRAx4pKKEtOI2V5V~oHL66kfD-E9JOwOfgru0DLbNWYpaTyadh5AR~J2r3diPfcY1YOVmT-PDdNDbEGy~3EN9P4EsAaFDpN0WPq9KVOfdCqGuZ9tz~gb9l45lzBT7X8AKyie7AGuU~NgPlOMQ1MKCtBXasuBzs9BzVHJpCXC3zNsfpKWuJ4gVjx7pRs118l0ardlY7H1X3LOR6OHVtoWLnec4BCl63GxMC~cB9Eiubn9Nn7ZbfMzU5BhT28DsQGlQWwYJDWDCanW4~ohK2I0avAyHvZos9I4TaFKtfRWPxZac4ZENZU85In-3If~kNoXrRvLALQQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
          alt="White Aesthetic Chair"
        />
      </div>
      <div className="product__info">
        <p className="product__item product__title">White Aesthetic Chair</p>
        <p className="product__item product__subtitle">
          Ergonomic executive chair upholstered in bonded black leather and PVC
          padded seat and back for all-day comfort and support
        </p>
        <p className="product__item product__content">$99.98</p>
        <div className="product__buttons">
          <Button className="product__buy">Buy Now</Button>
          <Button className="product__cart">Add to Cart</Button>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
