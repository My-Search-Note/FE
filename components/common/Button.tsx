import React from "react";

type Props = {
  children?: React.ReactNode;
  onClick?: () => void;
  color?: string;
};

const Button = ({ children }: Props) => {
  return (
    <button className="bg-blue-500 hover:bg-blue-600 text-white w-20 py-2 px-4 rounded-full flex items-center justify-center">
      {children}
    </button>
  );
};

export default Button;
