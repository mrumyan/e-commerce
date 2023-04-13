import cn from "classnames";
import React from "react";

import styles from "./Input.module.scss";

type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "value"
> & {
  value: string;
  disabled?: boolean;
  className?: string;
  onChange: (value: string) => void;
};

const Input: React.FC<InputProps> = ({
  value,
  onChange,
  disabled,
  className,
  ...props
}) => {
  const classNames = cn(
    styles.input,
    {
      [styles.input_disabled]: disabled,
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

export default React.memo(Input);
