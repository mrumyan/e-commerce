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
import { getCategoryUrl, SHOWN_ITEM_NUMBERS } from "@utils/ApiRequests";
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
  getProductsByCategory: (categoryId?: string) => void;
}

type PrivateFields = "_products" | "_hasError";

class CategoryStore implements ICategoryStore, ILocalStore {
  private _products: CollectionModel<number, ProductTypeModel> =
    getInitialCollectionModel();
  private _hasError: boolean = false;

  constructor() {
    makeObservable<CategoryStore, PrivateFields>(this, {
      _products: observable.ref,
      _hasError: observable,
      products: computed,
      hasError: computed,
      getProductsByCategory: action.bound,
    });
  }

  get products(): ProductTypeModel[] {
    return linearizeCollection(this._products);
  }

  get hasError(): boolean {
    return this._hasError;
  }

  getProductsByCategory(categoryId?: string): void {
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
            this._hasError = false;
          } catch {
            this._hasError = true;
            this._products = getInitialCollectionModel();
          }
        });
      })
      .catch(() => {
        this._hasError = true;
        this._products = getInitialCollectionModel();
      });
  }

  destroy(): void {
    // nothing to do
  }
}

export default CategoryStore;
