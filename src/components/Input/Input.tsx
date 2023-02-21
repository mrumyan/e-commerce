import cn from "classnames";

import "./Input.css";

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "value"
> & {
  value: string;
  disabled?: boolean;
  className?: string;
  onChange: (value: string) => void;
};

export const Input: React.FC<InputProps> = ({
  value,
  onChange,
  disabled,
  className,
  ...props
}) => {
  const classNames = cn(
    "input",
    {
      input_disabled: disabled,
    },
    className
  );

  return (
    <input
      type="text"
      className={classNames}
      value={value}
      disabled={disabled}
      onChange={(event) => onChange(event.target.value)}
      {...props}
    />
  );
};
