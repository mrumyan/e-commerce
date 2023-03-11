import { ReactNode, useCallback, useState } from "react";

import { CategoryTypeModel } from "@store/models/category";

import styles from "./MultiDropdown.module.scss";

type MultiDropdownProps = {
  options: CategoryTypeModel[];
  value?: CategoryTypeModel;
  onChange: (value?: CategoryTypeModel) => void;
  pluralizeOptions: (value: CategoryTypeModel) => string;
  disabled?: boolean;
  internalText?: string;
  className?: string;
};

export const MultiDropdown: React.FC<MultiDropdownProps> = ({
  options,
  value,
  onChange,
  disabled,
  internalText,
  className,
  pluralizeOptions,
  ...props
}) => {
  const [clicked, setClicked] = useState<boolean>(false);

  const onDropdownClick = (): void => setClicked(!clicked);
  const isDropdownShown = (): boolean => clicked && !disabled;

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

  return (
    <div className={styles["multi-dropdown"]}>
      <button
        className={styles["multi-dropdown__title"]}
        onClick={onDropdownClick}
        disabled={disabled}
      >
        {value ? pluralizeOptions(value) : internalText}
      </button>
      <ul
        className={`${styles["multi-dropdown__content"]} ${
          isDropdownShown() ? styles["clicked"] : ""
        }`}
      >
        {isDropdownShown() && optionsList}
      </ul>
    </div>
  );
};
