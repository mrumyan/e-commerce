import {
  CategoryTypeApi,
  CategoryTypeModel,
  normalizeCategoryType,
} from "@store/models/category";
import {
  CollectionModel,
  getInitialCollectionModel,
  linearizeCollection,
  normalizeCollection,
} from "@store/models/shared/collection";
import {
  normalizeProductType,
  ProductTypeApi,
  ProductTypeModel,
} from "@store/models/product";
import {
  getCategoriesUrl,
  getRelatedItemsUrl,
} from "@utils/ApiRequests";
import { Meta } from "@utils/meta";
import { ILocalStore } from "@utils/useLocalStore";
import axios from "axios";
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";

export interface ICategoryStore {
  getAllCategories: () => void;
  getProductsByCategory: (categoryId?: string) => void;
}

type PrivateFields = "_products" | "_allCategories" | "_meta";

class CategoryStore implements ICategoryStore, ILocalStore {
  private _products: CollectionModel<number, ProductTypeModel> = getInitialCollectionModel();
  private _allCategories: CollectionModel<number, CategoryTypeModel> = getInitialCollectionModel();
  private _meta: Meta = Meta.initial;

  constructor() {
    makeObservable<CategoryStore, PrivateFields>(this, {
      _products: observable.ref,
      _allCategories: observable.ref,
      _meta: observable,
      products: computed,
      meta: computed,
      getAllCategories: action.bound,
      getProductsByCategory: action.bound,
    });
  }

  get products(): ProductTypeModel[] {
    return linearizeCollection(this._products);
  }

  get allCategories(): CategoryTypeModel[] {
    return linearizeCollection(this._allCategories);
  }

  get meta(): Meta {
    return this._meta;
  }

  getAllCategories(): void {
    this._meta = Meta.loading;
    this._allCategories = getInitialCollectionModel();

    axios
      .get<CategoryTypeApi[]>(getCategoriesUrl())
      .then((response) => {
        runInAction(() => {
          try {
            this._allCategories = normalizeCollection(
              response.data.map(normalizeCategoryType),
              (item) => item.key
            );
            this._meta = Meta.success;
          } catch {
            this._allCategories = getInitialCollectionModel();
            this._meta = Meta.error;
          }
        });
      })
      .catch(() => {
        this._allCategories = getInitialCollectionModel();
        this._meta = Meta.error;
      });
  }

  getProductsByCategory(categoryId?: string): void {
    this._meta = Meta.loading;
    this._products = getInitialCollectionModel();

    const requestUrl: string = getRelatedItemsUrl(categoryId);

    axios
      .get<ProductTypeApi[]>(requestUrl)
      .then((response) => {
        runInAction(() => {
          try {
            this._products = normalizeCollection(
              response.data.map(normalizeProductType),
              (item) => item.id
            );
            this._meta = Meta.success;
          } catch {
            this._products = getInitialCollectionModel();
            this._meta = Meta.error;
          }
        });
      })
      .catch(() => {
        this._products = getInitialCollectionModel();
        this._meta = Meta.error;
      });
  }

  destroy(): void {
    // nothing to do
  }
}

export default CategoryStore;
