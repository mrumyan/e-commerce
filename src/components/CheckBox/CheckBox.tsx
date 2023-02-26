import cn from "classnames";

import "./Checkbox.scss";

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
  disabled,
  onChange,
  ...props
}) => {
  const classNames = cn("checkbox");

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
