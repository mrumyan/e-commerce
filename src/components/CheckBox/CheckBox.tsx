import cn from "classnames";

import styles from "./Checkbox.module.scss";

export type CheckBoxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> & {
  checked: boolean;
  disabled?: boolean;
  className?: string;
  onChange: (value: boolean) => void;
};

export const CheckBox: React.FC<CheckBoxProps> = ({
  checked,
  disabled = false,
  onChange,
  ...props
}) => {
  const classNames = cn(styles.checkbox);

  return (
    <input
      type="checkbox"
      className={classNames}
      checked={checked}
      disabled={disabled}
      onChange={(event) => onChange(event.target.checked)}
      {...props}
    />
  );
};
