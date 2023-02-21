import { Loader, LoaderSize } from "../Loader/Loader";

import "./WithLoader.css";

export type WithLoaderProps = React.PropsWithChildren<{
  loading: boolean;
}>;

export const WithLoader: React.FC<WithLoaderProps> = ({
  loading = true,
  children,
}) => {
  return (
    <div className="withloader">
      {loading && (
        <Loader
          loading={loading}
          size={LoaderSize.s}
          className="white"
        ></Loader>
      )}
      {children}
    </div>
  );
};
