import {
  normalizeProductType,
  ProductTypeApi,
  ProductTypeModel,
} from "@store/models/product";
import { getCategoryUrl } from "@utils/ApiRequests";
import { ILocalStore } from "@utils/ILocalStrore";
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

//const categoryId = 1; //remove
//let BASE_API_URL = `https://api.escuelajs.co/api/v1/categories/${categoryId}/products`;
type PrivateFields = "_products" | "_hasError";
const SHOWN_ITEM_NUMBERS = 4;
class CategoryStore implements ICategoryStore, ILocalStore {
  private _products: ProductTypeModel[] = [];
  private _hasError: boolean = false;

  constructor() {
    makeObservable<CategoryStore, PrivateFields>(this, {
      _products: observable,
      _hasError: observable,
      products: computed,
      hasError: computed,
      getProductsByCategory: action.bound,
    });
  }

  get products(): ProductTypeModel[] {
    return this._products;
  }

  get hasError(): boolean {
    return this._hasError;
  }

  getProductsByCategory(categoryId?: string): void {
    this._products = [];
    const requestUrl: string = getCategoryUrl(categoryId);

    axios
      .get<ProductTypeApi[]>(requestUrl)
      .then((response) => {
        runInAction(() => {
          try {
            this._products = response.data
              .slice(0, SHOWN_ITEM_NUMBERS)
              .map(normalizeProductType);
            this._hasError = false;
          } catch {
            this._hasError = true;
            this._products = [];
          }
        });
      })
      .catch(() => {
        this._hasError = true;
        this._products = [];
      });
  }

  destroy(): void {
    // nothing to do
  }
}

export default CategoryStore;
