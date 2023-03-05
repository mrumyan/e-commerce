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

type PrivateFields = "_list" | "_query" | "_offset" | "_hasMore" | "_hasError";

class ListProductsStore implements IListProductsStore, ILocalStore {
  // private _list: CollectionModel<number, ProductTypeModel> =
  //   getInitialCollectionModel();
  private _list: ProductTypeModel[] = [];
  private _query: string = rootStore.queryParamsStore.getParam(
    "title"
  ) as string;
  private _offset: number = Number(
    rootStore.queryParamsStore.getParam("offset")
  );
  private _hasMore: boolean = true;
  private _hasError: boolean = false;

  private requestUrl: string = `${getProductsListUrl()}?offset=0&limit=${DEFAULT_LIMIT}`;

  constructor() {
    makeObservable<ListProductsStore, PrivateFields>(this, {
      _list: observable.ref,
      _query: observable,
      _offset: observable,
      _hasMore: observable,
      _hasError: observable,
      list: computed,
      query: computed,
      hasError: computed,
      getProducts: action.bound,
      incrementOffset: action.bound,
    });
  }

  get list(): ProductTypeModel[] {
    return this._list; //return linearizeCollection(this._list);
  }

  get query(): string {
    return this._query;
  }

  get offset(): number {
    return this._offset;
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

    axios
      .get<ProductTypeApi[]>(this.requestUrl)
      .then((response) => {
        runInAction(() => {
          try {
            const list = response.data.map(normalizeProductType);
            if (list.length !== 0) {
              if (!this._list.find((item) => item.id === list[0].id)) {
                this._list.push(...list);
                //this._list = addToCollection(list, (item) => item.id, this._list);
              }
            } else {
              this._hasMore = false;
            }
            this._hasError = false;
          } catch {
            this._hasError = true;
            this._list = []; //this._list = getInitialCollectionModel();
          }
        });
      })
      .catch(() => {
        this._hasError = true;
        this._list = []; //this._list = getInitialCollectionModel();
      });
  }

  incrementOffset(): void {
    this._offset += 10;
  }

  private readonly _qpReaction: IReactionDisposer = reaction(
    () => rootStore.queryParamsStore.getParam("title"),
    (search) => {
      this._query = search as string;
      this.requestUrl = `${getProductsListUrl()}?title=${search}&offset=${
        this._offset
      }&limit=${DEFAULT_LIMIT}`;
      this.getProducts();
    }
  );

  private readonly _paginationReaction: IReactionDisposer = reaction(
    () => rootStore.queryParamsStore.getParam("offset"),
    (search) => {
      this._offset = Number(search);
      this.requestUrl = `${getProductsListUrl()}?title=${
        this._query
      }&offset=${search}&limit=${DEFAULT_LIMIT}`;
      this.getProducts();
    }
  );

  destroy(): void {
    // nothing to do
  }
}

export default ListProductsStore;
