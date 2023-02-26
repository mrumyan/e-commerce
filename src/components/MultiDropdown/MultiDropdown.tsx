import { ReactNode, useState } from "react";

import styles from "./MultiDropdown.module.scss";

export type Option = {
  key: string;
  value: string;
};

type MultiDropdownProps = {
  options: Option[];
  value: Option[];
  onChange: (value: Option[]) => void;
  disabled?: boolean;
  pluralizeOptions: (value: Option[]) => string;
};

export const MultiDropdown: React.FC<MultiDropdownProps> = ({
  options,
  value,
  onChange,
  disabled,
  pluralizeOptions,
  ...props
}) => {
  const selectedOptions: Option[] = value.slice(0);
  const [clicked, setClicked] = useState<boolean>(false);

  const findIndexSelectedOptions = (value: string): number =>
    selectedOptions.findIndex((item) => item.value === value);
  const onDropdownClick = (): void => setClicked(!clicked);
  const isDropdownShown = (): boolean => clicked && !disabled;

  const handleClick = (option: Option): void => {
    if (findIndexSelectedOptions(option.value) < 0) {
      selectedOptions.push(option);
      onChange([option]);
    } else {
      selectedOptions.splice(findIndexSelectedOptions(option.value), 1);
      onChange(selectedOptions);
    }
  };

  const optionsList: ReactNode = options.map(({ key, value }: Option) => (
    <li
      key={key}
      className={`${findIndexSelectedOptions(value) >= 0 ? "selected" : ""}`}
      onClick={() => handleClick({ key, value })}
      {...props}
    >
      {value}
    </li>
  ));

  return (
    <div className={styles["multi-dropdown"]}>
      <button
        className={styles["multi-dropdown__title"]}
        onClick={onDropdownClick}
        disabled={disabled}
      >
        {pluralizeOptions(value)}
      </button>
      <ul
        className={`${styles["multi-dropdown__content"]} ${
          isDropdownShown() ? "clicked" : ""
        }`}
      >
        {isDropdownShown() && optionsList}
      </ul>
    </div>
  );
};
