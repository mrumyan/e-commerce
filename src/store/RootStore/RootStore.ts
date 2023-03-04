import QueryParamsStore from "./QueryParamsStore";

export default class RootStore {
  readonly queryParamsStore = new QueryParamsStore();
}
