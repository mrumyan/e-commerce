import "./ProductCard.css";

export type ProductCardProps = {
  id: number;
  images: string[]; //image: string;
  title: string; //title: React.ReactNode;
  description: string; //subtitle: React.ReactNode;
  category?: string;
  content?: React.ReactNode;
  onClick?: React.MouseEventHandler;
};

export const ProductCard: React.FC<ProductCardProps> = ({
  images,
  title,
  description,
  category,
  content,
  onClick,
}) => {
  return (
    <figure className="card" onClick={onClick}>
      <img className="card__image" src={images[0]} alt={title as string} />
      <figcaption className="card__info">
        <p className="card__category">{category}</p>
        <p className="card__title">{title}</p>
        <div className="card__subtitle">{description}</div>
        <div className="card__content">{content}</div>
      </figcaption>
    </figure>
  );
};
