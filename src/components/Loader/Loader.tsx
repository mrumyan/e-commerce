import cn from "classnames";

import "./Loader.css";

export enum LoaderSize {
  s = "s",
  m = "m",
  l = "l",
}

export type LoaderProps = {
  loading?: boolean;
  size?: LoaderSize;
  className?: string;
};

export const Loader: React.FC<LoaderProps> = ({
  loading = true,
  size = LoaderSize.m,
  className,
}) => {
  const classNames = cn(
    "loader",
    {
      loader_small: size === LoaderSize.s,
      loader_medium: size === LoaderSize.m,
      loader_large: size === LoaderSize.l,
    },
    className
  );

  return loading ? <div className={classNames}></div> : null;
};
