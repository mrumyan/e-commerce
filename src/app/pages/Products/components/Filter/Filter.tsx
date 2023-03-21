import Input from "@components/Input";
import MultiDropdown from "@components/MultiDropdown";
import { useCategory } from "@context/CategoryContext";
import { useListProducts } from "@context/ListProductsContext";
import { Meta } from "@utils/meta";

import { observer } from "mobx-react-lite";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Filter.module.scss";

const Filter = () => {
  const { allCategories } = useCategory();
  const { selectedCategory, query, setQuery, setSelectedCategory, meta } = useListProducts();

  let navigate = useNavigate();

  const onChange = useCallback((query: string) => {
    setQuery(query);
    navigate(`?title=${query}`);
  }, []);

  return (
    <div className={styles.main__filter}>
      <Input
        value={query as string}
        onChange={onChange}
        placeholder="Search by title"
        className={styles.main__search}
      />
      <MultiDropdown
        options={allCategories}
        value={selectedCategory}
        onChange={setSelectedCategory}
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
