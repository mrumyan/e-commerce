import cn from "classnames";

import styles from "./Loader.module.scss";

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
    styles.loader,
    {
      [styles.loader_small]: size === LoaderSize.s,
      [styles.loader_medium]: size === LoaderSize.m,
      [styles.loader_large]: size === LoaderSize.l,
    },
    className
  );

  return loading ? <div className={classNames}></div> : null;
};
