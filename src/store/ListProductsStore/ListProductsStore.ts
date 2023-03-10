import {
  addToCollection,
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
import { QueryParamsType } from "@store/RootStore/QueryParamsStore";
import { DEFAULT_LIMIT, getProductsListUrl } from "@utils/ApiRequests";
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

type PrivateFields = "_list" | "_query" | "_hasMore" | "_hasError";

class ListProductsStore implements IListProductsStore, ILocalStore {
  // private _list: CollectionModel<number, ProductTypeModel> =
  //   getInitialCollectionModel();
  private _list: ProductTypeModel[] = [];
  private _query: QueryParamsType =
    rootStore.queryParamsStore.getParam("title") ?? "";
  private _hasMore: boolean = true;
  private _hasError: boolean = false;

  constructor() {
    makeObservable<ListProductsStore, PrivateFields>(this, {
      _list: observable.ref,
      _query: observable,
      _hasMore: observable,
      _hasError: observable,
      list: computed,
      query: computed,
      hasError: computed,
      getProducts: action.bound,
    });
  }

  private readonly _qpReaction: IReactionDisposer = reaction(
    () => rootStore.queryParamsStore.getParam("title"),
    (search) => {
      this._query = search;
      this._list = []; //this._list = getInitialCollectionModel();
      this.getProducts();
    }
  );

  get list(): ProductTypeModel[] {
    return this._list; //return linearizeCollection(this._list);
  }

  get query(): QueryParamsType {
    return this._query;
  }

  get hasMore(): boolean {
    return this._hasMore;
  }

  get hasError(): boolean {
    return this._hasError;
  }

  setQuery(query: string): void {
    this._query = query;
  }

  getProducts(): void {
    //this._list = getInitialCollectionModel();
    const requestUrl = `${getProductsListUrl()}?title=${this._query}&offset=${
      this._list.length
    }&limit=${DEFAULT_LIMIT}`;

    axios
      .get<ProductTypeApi[]>(requestUrl)
      .then((response) => {
        runInAction(() => {
          try {
            const list = response.data.map(normalizeProductType);
            this._list = [...this._list, ...list]; //this._list = addToCollection(list, (item) => item.id, this._list);
            this._hasMore = !!list.length;
            this._hasError = false;
          } catch {
            this._list = []; //this._list = getInitialCollectionModel();
            this._hasError = true;
            this._hasMore = false;
          }
        });
      })
      .catch(() => {
        this._list = []; //this._list = getInitialCollectionModel();
        this._hasError = true;
        this._hasMore = false;
      });
  }

  destroy(): void {
    //this._qpReaction();
  }
}

export default ListProductsStore;
