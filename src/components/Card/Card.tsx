import './Card.css';

export type CardProps = {
    image: string;
    title: React.ReactNode;
    subtitle: React.ReactNode;
    category?: string;
    content?: React.ReactNode;
    onClick?: React.MouseEventHandler;
};

export const Card: React.FC<CardProps> = ({ image, title, subtitle, category, content, onClick }) => {
    return (
        <figure className='card' onClick={onClick}>
            <img className='card__image' src={image} alt={title as string} />
            <figcaption className='card__info'>
                <p className='card__category'>{category}</p>
                <p className='card__title'>{title}</p>
                <div className='card__subtitle'>{subtitle}</div>
                <div className='card__content'>{content}</div>
            </figcaption>
        </figure>
    );
};