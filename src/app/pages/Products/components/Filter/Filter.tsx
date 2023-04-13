import Input from "@components/Input";
import MultiDropdown from "@components/MultiDropdown";
import { useCategory } from "@context/CategoryContext";
import { useProductList } from "@context/ProductListContext";
import { CategoryTypeModel } from "@store/models/category";
import { Meta } from "@utils/meta";

import { observer } from "mobx-react-lite";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Filter.module.scss";

const Filter = () => {
  const { allCategories } = useCategory();
  const { selectedCategory, query, setQuery, setSelectedCategory, meta } = useProductList();

  let navigate = useNavigate();

  useEffect(() => {
    if (!!selectedCategory) {
      navigate(`?title=${query}&category[${selectedCategory?.value ?? ""}]=${selectedCategory?.key ?? ""}`);
    } else {
      navigate(`?title=${query}`);
    }
  }, [query, selectedCategory]);

  const onInputChange = useCallback((query: string) => {
    setQuery(query);
  }, [query]);

  const onMultiDropdownChange = useCallback((selectedCategory: CategoryTypeModel | undefined) => {
    setSelectedCategory(selectedCategory);
  }, [selectedCategory]);

  return (
    <div className={styles.main__filter}>
      <Input
        value={query as string}
        onChange={onInputChange}
        placeholder="Search by title"
        className={styles.main__search}
      />
      <MultiDropdown
        options={allCategories}
        value={selectedCategory}
        onChange={onMultiDropdownChange}
        pluralizeOptions={() => `Selected: ${selectedCategory?.value}`}
        internalText="Filter"
        loading={meta === Meta.loading}
        disabled={meta === Meta.loading}
        className={styles.main__categories}
      />
    </div>
  );
};

export default observer(Filter);
