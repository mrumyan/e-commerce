import MultiDropdown from "@components/MultiDropdown";
import { useCategory } from "@context/CategoryContext";
import { useListProducts } from "@context/ListProductsContext";
import { Meta } from "@utils/meta";
import { observer } from "mobx-react-lite";

const Filter = () => {
  const { allCategories } = useCategory();
  const { selectedCategory, setSelectedCategory, meta } = useListProducts();

  return (
    <MultiDropdown
      options={allCategories}
      value={selectedCategory}
      onChange={setSelectedCategory}
      pluralizeOptions={() => `Selected: ${selectedCategory?.value}`}
      internalText="Filter"
      loading={meta === Meta.loading}
      disabled={meta === Meta.loading}
    />
  );
};

export default observer(Filter);
