import {
  normalizeProductType,
  ProductTypeApi,
  ProductTypeModel,
} from "@store/models/product";
import { getProductUrl } from "@utils/ApiRequests";
import { ILocalStore } from "@utils/useLocalStore";
import axios from "axios";
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";

export interface IProductStore {
  getProduct: (productId?: string) => void;
}

type PrivateFields = "_product" | "_hasError";

class ProductStore implements IProductStore, ILocalStore {
  private _product: ProductTypeModel | null = null;
  private _hasError: boolean = false;

  constructor() {
    makeObservable<ProductStore, PrivateFields>(this, {
      _product: observable,
      _hasError: observable,
      product: computed,
      hasError: computed,
      getProduct: action.bound,
    });
  }

  get product(): ProductTypeModel | null {
    return this._product;
  }

  get hasError(): boolean {
    return this._hasError;
  }

  getProduct(productId?: string): void {
    this._product = null;
    const requestUrl: string = getProductUrl(productId);

    axios
      .get<ProductTypeApi>(requestUrl)
      .then((response) => {
        runInAction(() => {
          try {
            this._product = normalizeProductType(response.data);
            this._hasError = false;
          } catch {
            this._hasError = true;
            this._product = null;
          }
        });
      })
      .catch(() => {
        this._hasError = true;
        this._product = null;
      });
  }

  destroy(): void {
    // nothing to do
  }
}

export default ProductStore;
