import { ReactNode, useCallback, useEffect, useState } from "react";

import cn from "classnames";

import { Loader, LoaderSize } from "@components/Loader";
import { CategoryTypeModel } from "@store/models/category";

import styles from "./MultiDropdown.module.scss";

type MultiDropdownProps = {
  options: CategoryTypeModel[];
  value?: CategoryTypeModel;
  onChange: (value?: CategoryTypeModel) => void;
  pluralizeOptions: (value: CategoryTypeModel) => string;
  loading?: boolean;
  disabled?: boolean;
  internalText?: string;
  className?: string;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({
  options,
  value,
  onChange,
  pluralizeOptions,
  loading,
  disabled,
  internalText,
  className,
  ...props
}) => {
  const [clicked, setClicked] = useState<boolean>(false);



  const onDropdownClick = useCallback(() => setClicked(!clicked), [clicked]);
  const isDropdownShown = useCallback(
    (): boolean => clicked && !disabled,
    [clicked, disabled]
  );

  const isOptionAlreadySelected = useCallback(
    (selectedValue: string) => selectedValue === value?.value,
    [value]
  );

  const handleClick = (
    event: React.MouseEvent,
    option: CategoryTypeModel
  ): void =>
    onChange(!isOptionAlreadySelected(option.value) ? option : undefined);

  const optionsList: ReactNode = options.map(
    ({ key: categoryKey, value: categoryValue }: CategoryTypeModel) => {
      return (
        <li
          key={categoryKey}
          className={
            isOptionAlreadySelected(categoryValue) ? styles["selected"] : ""
          }
          onClick={(event) =>
            handleClick(event, { key: categoryKey, value: categoryValue })
          }
          {...props}
        >
          {categoryValue}
        </li>
      );
    }
  );

  const dropdownClassNames = cn(styles["multi-dropdown"], className);
  const contentClassNames = cn(
    styles["multi-dropdown__content"],
    {
      [styles.clicked]: isDropdownShown(),
    }
  );

  return (
    <div className={dropdownClassNames}>
      <button
        className={styles["multi-dropdown__title"]}
        onClick={onDropdownClick}
        disabled={disabled}
      >
        {loading ? (
          <Loader loading={loading} size={LoaderSize.s} />
        ) : value ? (
          pluralizeOptions(value)
        ) : (
          internalText
        )}
      </button>
      <ul className={`${contentClassNames}`}>
        {isDropdownShown() && optionsList}
      </ul>
    </div>
  );
};

export default MultiDropdown;
