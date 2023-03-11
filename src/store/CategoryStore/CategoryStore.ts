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
} from "@store/models/collection";
import {
  normalizeProductType,
  ProductTypeApi,
  ProductTypeModel,
} from "@store/models/product";
import {
  getCategoriesUrl,
  getCategoryUrl,
  SHOWN_ITEM_NUMBERS,
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
  private _products: CollectionModel<number, ProductTypeModel>;
  private _allCategories: CollectionModel<number, CategoryTypeModel>;
  private _meta: Meta;

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

    this._products = getInitialCollectionModel();
    this._allCategories = getInitialCollectionModel();
    this._meta = Meta.initial;
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

    const requestUrl: string = getCategoryUrl(categoryId);

    axios
      .get<ProductTypeApi[]>(requestUrl)
      .then((response) => {
        runInAction(() => {
          try {
            const shownList = response.data
              .slice(0, SHOWN_ITEM_NUMBERS)
              .map(normalizeProductType);
            this._products = normalizeCollection(shownList, (item) => item.id);
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
