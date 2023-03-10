import React from "react";
import Nav from "@/components/LandingPage/Nav";
import Sections from "@/components/LandingPage/Sections/index";

type Props = {};

const index = (props: Props) => {
  return (
    <div className="h-fit flex flex-col">
      <Nav />
      <Sections />
    </div>
  );
};

export default index;
