import styles from "./WithLoader.module.scss";
import { Loader, LoaderSize } from "../Loader/Loader";

export type WithLoaderProps = React.PropsWithChildren<{
  loading: boolean;
}>;

export const WithLoader: React.FC<WithLoaderProps> = ({
  loading = true,
  children,
}) => {
  return (
    <div className={styles.withloader}>
      {loading && (
        <Loader
          loading={loading}
          size={LoaderSize.s}
          className={styles.white}
        ></Loader>
      )}
      {children}
    </div>
  );
};
