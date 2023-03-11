import { CategoryTypeModel } from "@store/models/category";
import {
  CollectionModel,
  getInitialCollectionModel,
  getLength,
  joinCollections,
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
import { DEFAULT_LIMIT, getFullUrl } from "@utils/ApiRequests";
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
  setSelectedCategory: (category?: CategoryTypeModel) => void;
  getProducts: (hasNewQuery: boolean, categoryId?: number) => void;
}

type PrivateFields =
  | "_list"
  | "_selectedCategory"
  | "_query"
  | "_hasMore"
  | "_hasError";

class ListProductsStore implements IListProductsStore, ILocalStore {
  private _list: CollectionModel<number, ProductTypeModel>;
  private _selectedCategory?: CategoryTypeModel;
  private _query?: QueryParamsType;
  private _hasMore: boolean = true;
  private _hasError: boolean = false;

  constructor() {
    makeObservable<ListProductsStore, PrivateFields>(this, {
      _list: observable.ref,
      _selectedCategory: observable,
      _query: observable,
      _hasMore: observable,
      _hasError: observable,
      list: computed,
      query: computed,
      hasError: computed,
      setSelectedCategory: action.bound,
      getProducts: action.bound,
    });

    this._list = getInitialCollectionModel();
    this._query = rootStore.queryParamsStore.getParam("title") ?? "";
  }

  private readonly _qpReaction: IReactionDisposer = reaction(
    () => rootStore.queryParamsStore.getParam("title"),
    (search) => {
      this._query = search;
      this.getProducts(true);
    }
  );

  private readonly _categoryReaction: IReactionDisposer = reaction(
    () => this._selectedCategory,
    (selectedCategory) => {
      this._selectedCategory = selectedCategory;
      this.getProducts(true);
    }
  );

  get list(): ProductTypeModel[] {
    return linearizeCollection(this._list);
  }

  get selectedCategory(): CategoryTypeModel | undefined {
    return this._selectedCategory;
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

  setSelectedCategory(category?: CategoryTypeModel): void {
    this._selectedCategory = category;
  }

  getProducts(hasNewQuery = false): void {
    const requestUrl = getFullUrl(
      this._query as string,
      hasNewQuery ? 0 : getLength(this._list),
      this._selectedCategory?.key
    );

    axios
      .get<ProductTypeApi[]>(requestUrl)
      .then((response) => {
        runInAction(() => {
          try {
            this._list = hasNewQuery ? getInitialCollectionModel() : this._list;

            const list = response.data.map(normalizeProductType);
            this._list = joinCollections(
              this._list,
              normalizeCollection(list, (item) => item.id)
            );
            this._hasMore = !(list.length < DEFAULT_LIMIT);
            this._hasError = false;
          } catch {
            this._list = getInitialCollectionModel();
            this._hasError = true;
            this._hasMore = false;
          }
        });
      })
      .catch(() => {
        this._list = getInitialCollectionModel();
        this._hasError = true;
        this._hasMore = false;
      });
  }

  destroy(): void {
    this._qpReaction();
    this._categoryReaction();
  }
}

export default ListProductsStore;
