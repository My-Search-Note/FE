import React from "react";

type Props = {
  children?: React.ReactNode;
};

const Sidebar = ({ children }: Props) => {
  return <div>{children}</div>;
};

export default Sidebar;
