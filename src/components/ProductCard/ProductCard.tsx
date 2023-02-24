import "./ProductCard.css";

export type ProductCardProps = {
  title: React.ReactNode;
  subtitle: React.ReactNode;
  image: string;
  category?: string;
  content?: React.ReactNode;
  onClick?: React.MouseEventHandler;
};

export const ProductCard: React.FC<ProductCardProps> = ({
  title,
  subtitle,
  image,
  category,
  content,
  onClick,
}) => {
  return (
    <figure className="card" onClick={onClick}>
      <img className="card__image" src={image} alt={title as string} />
      <figcaption className="card__info">
        <p className="card__item card__category">{category}</p>
        <p className="card__item card__title">{title}</p>
        <p className="card__item card__subtitle">{subtitle}</p>
        <p className="card__item card__content">{content}</p>
      </figcaption>
    </figure>
  );
};
