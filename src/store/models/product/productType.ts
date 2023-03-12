export type ProductTypeApi = {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
  category: {
    id: number;
    name: string;
    image: string;
  };
};

export type ProductTypeModel = {
  id: number;
  title: string;
  subtitle: string;
  images: string[];
  categoryId?: number;
  category?: string;
  content?: string;
  onClick?: React.MouseEventHandler;
};

export const normalizeProductType = (
  from: ProductTypeApi
): ProductTypeModel => ({
  id: from.id,
  title: from.title,
  subtitle: from.description,
  images: from.images,
  categoryId: from.category.id,
  category: from.category.name,
  content: `$${from.price}`,
});
