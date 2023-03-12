import {
  normalizeProductType,
  ProductTypeApi,
  ProductTypeModel,
} from "@store/models/product";
import { getProductUrl } from "@utils/ApiRequests";
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

export interface IProductStore {
  getProduct: (productId?: string) => void;
}

type PrivateFields = "_product" | "_meta";

class ProductStore implements IProductStore, ILocalStore {
  private _product: ProductTypeModel | null = null;
  private _meta: Meta = Meta.initial;

  constructor() {
    makeObservable<ProductStore, PrivateFields>(this, {
      _product: observable,
      _meta: observable,
      product: computed,
      meta: computed,
      getProduct: action.bound,
    });
  }

  get product(): ProductTypeModel | null {
    return this._product;
  }

  get meta(): Meta {
    return this._meta;
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
            this._meta = Meta.success;
          } catch {
            this._product = null;
            this._meta = Meta.error;
          }
        });
      })
      .catch(() => {
        this._product = null;
        this._meta = Meta.error;
      });
  }

  destroy(): void {
    // nothing to do
  }
}

export default ProductStore;
