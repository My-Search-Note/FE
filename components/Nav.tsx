import Link from "next/link";
import React, { useState } from "react";
import SigninModal from "./SigninModal";

type Props = {};

const Nav = (props: Props) => {
  const [isClicked, setIsClicked] = useState(false);
  const handleModalopen = () => {
    setIsClicked(!isClicked);
  };

  return (
    <nav className="h-14 px-12 md:px-28 z-50 flex items-center justify-between bg-slate-100 sticky top-0 shadow-sm">
      {isClicked ? <SigninModal haldleModal={handleModalopen} /> : null}
      <Link href="/">
        <span className="text-2xl">로고</span>
      </Link>
      <div>
        <button className="p-1 mr-4 md:mr-6" onClick={handleModalopen}>
          Sign in
        </button>
        <button className="bg-black text-white rounded-full py-2 px-4 hover:bg-gray-700 focus:outline-none focus:shadow-outline">
          Sign up
        </button>
      </div>
    </nav>
  );
};

export default Nav;
