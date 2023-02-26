import cn from "classnames";

import styles from "./Button.module.scss";
import { WithLoader } from "../WithLoader/WithLoader";

export type ButtonProps = React.PropsWithChildren<{
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  handleClick?: (event: React.MouseEvent) => void;
}> &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = ({
  loading = false,
  disabled = false,
  className,
  handleClick,
  children,
  ...props
}) => {
  const classNames = cn(
    styles.button,
    {
      [styles.button_disabled]: disabled || loading,
      [styles.button_loading]: loading,
    },
    className
  );

  return (
    <button className={classNames} disabled={loading || disabled} {...props}>
      {loading ? (
        <WithLoader loading={loading}>{children}</WithLoader>
      ) : (
        children
      )}
    </button>
  );
};
