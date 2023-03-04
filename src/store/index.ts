import CategoryStore from "./CategoryStore";
import ListProductsStore from "./ListProductsStore";
import ProductStore from "./ProductStore";

const listProductsStore = new ListProductsStore();
const productStore = new ProductStore();
const categoryStore = new CategoryStore();

export { listProductsStore, productStore, categoryStore };
