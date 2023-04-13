import styles from "./WithLoader.module.scss";
import Loader, { LoaderSize } from "../Loader/Loader";
import React from "react";

type WithLoaderProps = React.PropsWithChildren<{
  loading: boolean;
}>;

const WithLoader: React.FC<WithLoaderProps> = ({
  loading = true,
  children,
}) => {
  return (
    <div className={styles.withloader}>
      {loading && (
        <Loader
          loading={loading}
          size={LoaderSize.l}
          className={styles.white}
        ></Loader>
      )}
      {children}
    </div>
  );
};

export default React.memo(WithLoader);
