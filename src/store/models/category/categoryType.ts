import { QueryParamsType } from "@store/RootStore/QueryParamsStore";

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

export const getCategoryTypeModel = (
  from: QueryParamsType
): CategoryTypeModel | undefined => {
  let category: CategoryTypeModel | undefined = undefined;
  from = from as qs.ParsedQs;
  for (let item in from as qs.ParsedQs) {
    category = {
      key: Number(from[item]),
      value: item,
    }
  }
  return category;
};
