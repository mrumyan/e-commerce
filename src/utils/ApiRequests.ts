const BASE_URL: string = "https://api.escuelajs.co/api/v1";

const DEFAULT_CATEGORY: string = "1";
const DEFAULT_PRODUCT_ID: string = "1";

export const DEFAULT_LIMIT: number = 10;
export const SHOWN_ITEM_NUMBERS = 4;

export const getProductsListUrl = (): string => {
  return `${BASE_URL}/products`;
};

export const getProductUrl = (productId?: string): string => {
  return `${BASE_URL}/products/${productId ?? DEFAULT_PRODUCT_ID}`;
};

export const getCategoriesUrl = (): string => {
  return `${BASE_URL}/categories`;
};

export const getCategoryUrl = (categotyId?: string): string => {
  return `${getCategoriesUrl()}/${categotyId ?? DEFAULT_CATEGORY}/products`;
};

export const getFullUrl = (
  title: string,
  offset: number,
  categotyId?: number
): string => {
  let fullUrl = `${getProductsListUrl()}?title=${title}&offset=${offset}&limit=${DEFAULT_LIMIT}`;
  if (categotyId) {
    fullUrl += `&categoryId=${categotyId}`;
  }
  return fullUrl;
};
