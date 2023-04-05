import React from "react";
import List from "../common/List";

type Props = {};

const NewsContainer = (props: Props) => {
  return (
    <div className="w-full h-full flex flex-col px-3">
      <div className="h-full bg-white px-4 md:px-0 drop-shadow-sm lg:drop-shadow-xl flex flex-col justify-center items-center">
        <List />
      </div>
    </div>
  );
};

export default NewsContainer;
