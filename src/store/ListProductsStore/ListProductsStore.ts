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
  private _list: CollectionModel<number, ProductTypeModel> =
    getInitialCollectionModel();
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
    return linearizeCollection(this._list);
  }

  get hasError(): boolean {
    return this._hasError;
  }

  getProducts(): void {
    this._list = getInitialCollectionModel();
    const requestUrl: string = getProductsListUrl();

    axios
      .get<ProductTypeApi[]>(requestUrl)
      .then((response) => {
        runInAction(() => {
          try {
            const list = response.data.map(normalizeProductType);
            this._list = normalizeCollection(list, (item) => item.id);
            this._hasError = false;
          } catch {
            this._hasError = true;
            this._list = getInitialCollectionModel();
          }
        });
      })
      .catch(() => {
        this._hasError = true;
        this._list = getInitialCollectionModel();
      });
  }

  destroy(): void {
    // nothing to do
  }
}

export default ListProductsStore;
