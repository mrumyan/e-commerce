import { ReactNode } from "react";

import Header from "@components/Header";

import styles from "./Page.module.scss";
import React from "react";

type PageProps = React.PropsWithChildren<{
  children?: ReactNode;
}>;

const Page: React.FC<PageProps> = ({ children }) => {
  return (
    <div className={styles.page__wrapper}>
      <Header></Header>
      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default React.memo(Page);
