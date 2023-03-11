import { MultiDropdown } from "@components/MultiDropdown/MultiDropdown";
import { useCategory } from "@context/CategoryContext";
import { useListProducts } from "@context/ListProductsContext";
import { observer } from "mobx-react-lite";

const Filter = () => {
  const { allCategories } = useCategory();
  const { selectedCategory, setSelectedCategory } = useListProducts();

  return (
    <MultiDropdown
      options={allCategories}
      value={selectedCategory}
      onChange={setSelectedCategory}
      pluralizeOptions={() => `Selected: ${selectedCategory?.value}`}
      internalText="Filter"
    />
  );
};

export default observer(Filter);
