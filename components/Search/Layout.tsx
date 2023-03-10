import React from "react";
import Nav from "./Nav";

type Props = {
  children?: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="bg-red-100 w-screen h-screen flex justify-between overflow-hidden">
      <Nav />
      <div className="bg-slate-200 w-[calc(100%-4rem)] flex flex-col md:flex-row">
        {children}
      </div>
    </div>
  );
};

export default Layout;
