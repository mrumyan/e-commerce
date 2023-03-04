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
import rootStore from "@store/RootStore";
import { getProductsListUrl } from "@utils/ApiRequests";
import { ILocalStore } from "@utils/useLocalStore";
import axios from "axios";
import {
  makeObservable,
  observable,
  computed,
  action,
  runInAction,
  IReactionDisposer,
  reaction,
} from "mobx";

export interface IListProductsStore {
  getProducts: (requestUrl: string) => void;
}

type PrivateFields = "_list" | "_query" | "_hasError";

class ListProductsStore implements IListProductsStore, ILocalStore {
  private _list: CollectionModel<number, ProductTypeModel> =
    getInitialCollectionModel();
  private _query: string = "";
  private _hasError: boolean = false;

  private requestUrl: string = getProductsListUrl();

  constructor() {
    makeObservable<ListProductsStore, PrivateFields>(this, {
      _list: observable.ref,
      _query: observable,
      _hasError: observable,
      list: computed,
      query: computed,
      hasError: computed,
      getProducts: action.bound,
    });
  }

  get list(): ProductTypeModel[] {
    return linearizeCollection(this._list);
  }

  get query(): string {
    return this._query;
  }

  get hasError(): boolean {
    return this._hasError;
  }

  setQuery(query: string): void {
    this._query = query;
  }

  getProducts(): void {
    this._list = getInitialCollectionModel();

    axios
      .get<ProductTypeApi[]>(this.requestUrl)
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

  private readonly _qpReaction: IReactionDisposer = reaction(
    () => rootStore.queryParamsStore.getParam("title"),
    (search) => {
      this.requestUrl = `${getProductsListUrl()}?title=${search}`;
      this.getProducts();
    }
  );

  destroy(): void {
    // nothing to do
  }
}

export default ListProductsStore;
