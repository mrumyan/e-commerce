import {
  normalizeProductType,
  ProductTypeApi,
  ProductTypeModel,
} from "@store/models/product";
import { getProductsListUrl } from "@utils/ApiRequests";
import { ILocalStore } from "@utils/ILocalStrore";
import axios from "axios";
import {
  makeObservable,
  observable,
  computed,
  action,
  runInAction,
} from "mobx";

export interface IListProductsStore {
  getProducts: () => void;
}

type PrivateFields = "_list" | "_hasError";
class ListProductsStore implements IListProductsStore, ILocalStore {
  private _list: ProductTypeModel[] = [];
  private _hasError: boolean = false;

  constructor() {
    makeObservable<ListProductsStore, PrivateFields>(this, {
      _list: observable.ref,
      _hasError: observable,
      list: computed,
      hasError: computed,
      getProducts: action.bound,
    });
  }

  get list(): ProductTypeModel[] {
    return this._list;
  }

  get hasError(): boolean {
    return this._hasError;
  }

  getProducts(): void {
    const requestUrl: string = getProductsListUrl();
    this._list = [];
    axios
      .get<ProductTypeApi[]>(requestUrl)
      .then((response) => {
        runInAction(() => {
          try {
            this._list = response.data.map(normalizeProductType);
            this._hasError = false;
          } catch {
            this._hasError = true;
            this._list = [];
          }
        });
      })
      .catch(() => {
        this._hasError = true;
        this._list = [];
      });
  }

  destroy(): void {
    // nothing to do
  }
}

export default ListProductsStore;
