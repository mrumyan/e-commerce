import { ReactNode } from "react";

import Header from "@components/Header";

import "./Page.css";

export type PageProps = React.PropsWithChildren<{
  children?: ReactNode;
}>;

const Page: React.FC<PageProps> = ({ children }) => {
  return (
    <div className="page__wrapper">
      <Header></Header>
      <main className="main">{children}</main>
    </div>
  );
};

export default Page;
