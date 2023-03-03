import React from "react";

type Props = {
  children?: React.ReactNode;
};

//자식 컴포에서 mb로 할 것인지, 부모 컴포에서 space로 넣을 것인지 생각해보기.

const Box = ({ children }: Props) => {
  return (
    <div
      draggable
      className="w-full bg-white rounded-lg shadow-md px-3 py-2 cursor-pointer hover:bg-slate-100"
    >
      {children}
    </div>
  );
};

export default Box;
