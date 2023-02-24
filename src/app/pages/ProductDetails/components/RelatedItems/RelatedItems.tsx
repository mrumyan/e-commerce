import { ProductCard } from "@components/ProductCard/ProductCard";
import "./RelatedItem.css";

const RelatedItems = () => {
  return (
    <div className="related-items">
      <p className="related-items__title">Related Items</p>
      <div className="related-items__content">
        <ProductCard
          title="title1"
          subtitle="subtitle1"
          image="https://s3-alpha-sig.figma.com/img/868a/b6ff/633c20471ae9acc5904924ae5297e19a?Expires=1678060800&Signature=q2t7AzZ1EMvIuZdAFy5DiPwf3sz~Oe8JTwV8NlNn9Kw8hbx-N9Alw7zV27vRe6mtELgS6QaPwH3Ya6gq7j4loySz-XaMzwUbHLwKraWMoWH9duFyFsvThNL1H6Q1gOvEXtjkZnPBadVtXv8n1SO-HV6TtWeXH8Rk4qBoLy3wJqx7VogKw3UCMmhWGGsu4HIe-SfxhOu9iVEbGMtZ-oMWro~a6cIRzXZjtcIWGnMZCPFaOLCOyF76oZqFlpAjhw-SvhdcXFo1y2qWHuIehtgmnFFZIAKanDtbyfJnj2VfuKiQL2bprnZg0v2I7dqzRymrRFOPRyG0ERi1Ntw2cmhouw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
        />
        <ProductCard
          title="title2"
          subtitle="subtitle2"
          image="https://s3-alpha-sig.figma.com/img/868a/b6ff/633c20471ae9acc5904924ae5297e19a?Expires=1678060800&Signature=q2t7AzZ1EMvIuZdAFy5DiPwf3sz~Oe8JTwV8NlNn9Kw8hbx-N9Alw7zV27vRe6mtELgS6QaPwH3Ya6gq7j4loySz-XaMzwUbHLwKraWMoWH9duFyFsvThNL1H6Q1gOvEXtjkZnPBadVtXv8n1SO-HV6TtWeXH8Rk4qBoLy3wJqx7VogKw3UCMmhWGGsu4HIe-SfxhOu9iVEbGMtZ-oMWro~a6cIRzXZjtcIWGnMZCPFaOLCOyF76oZqFlpAjhw-SvhdcXFo1y2qWHuIehtgmnFFZIAKanDtbyfJnj2VfuKiQL2bprnZg0v2I7dqzRymrRFOPRyG0ERi1Ntw2cmhouw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
        />
        <ProductCard
          title="title3"
          subtitle="subtitle3"
          image="https://s3-alpha-sig.figma.com/img/868a/b6ff/633c20471ae9acc5904924ae5297e19a?Expires=1678060800&Signature=q2t7AzZ1EMvIuZdAFy5DiPwf3sz~Oe8JTwV8NlNn9Kw8hbx-N9Alw7zV27vRe6mtELgS6QaPwH3Ya6gq7j4loySz-XaMzwUbHLwKraWMoWH9duFyFsvThNL1H6Q1gOvEXtjkZnPBadVtXv8n1SO-HV6TtWeXH8Rk4qBoLy3wJqx7VogKw3UCMmhWGGsu4HIe-SfxhOu9iVEbGMtZ-oMWro~a6cIRzXZjtcIWGnMZCPFaOLCOyF76oZqFlpAjhw-SvhdcXFo1y2qWHuIehtgmnFFZIAKanDtbyfJnj2VfuKiQL2bprnZg0v2I7dqzRymrRFOPRyG0ERi1Ntw2cmhouw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
        />
      </div>
    </div>
  );
};

export default RelatedItems;
