const BASE_URL: string = "https://api.escuelajs.co/api/v1";

const DEFAULT_CATEGORY: string = "1";
const DEFAULT_PRODUCT_ID: string = "1";

export const SHOWN_ITEM_NUMBERS = 4;

export const getProductsListUrl = () => {
  return `${BASE_URL}/products`;
};

export const getProductUrl = (productId?: string) => {
  return `${BASE_URL}/products/${productId ?? DEFAULT_PRODUCT_ID}`;
};

export const getCategoryUrl = (categotyId?: string) => {
  return `${BASE_URL}/categories/${categotyId ?? DEFAULT_CATEGORY}/products`;
};
