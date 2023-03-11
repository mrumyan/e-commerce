export type CategoryTypeApi = {
  id: number;
  name: string;
  image: string;
};

export type CategoryTypeModel = {
  key: number;
  value: string;
};

export const normalizeCategoryType = (
  from: CategoryTypeApi
): CategoryTypeModel => ({
  key: from.id,
  value: from.name,
});
