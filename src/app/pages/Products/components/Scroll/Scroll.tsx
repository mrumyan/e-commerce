import { useEffect } from "react";

import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";

export type ScrollProps = React.PropsWithChildren<{
  lengthData?: number;
  fetchData?: Function;
}>;

const Scroll = ({ lengthData, fetchData, children }: ScrollProps) => {
  let navigate = useNavigate();
  useEffect(() => {
    //navigate(`?offset=${offset}&limit=${limit}`);
    navigate(`?offset=0&limit=10`);
  }, []);

  return (
    <>{children}</>
    // <InfiniteScroll
    //     dataLength={lengthData}
    //     next={fetchData}
    //     hasMore={true}
    //     loader={< h4 > Loading...</h4>}>
    //     {children}
    // </InfiniteScroll>
  );
};

export default Scroll;
