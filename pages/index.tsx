import React from "react";
import Header from "@/components/LandingPage/Header";
import Sections from "@/components/LandingPage/Sections/index";

type Props = {};

const index = (props: Props) => {
  return (
    <div className="h-fit flex flex-col">
      <Header />
      <Sections />
    </div>
  );
};

export default index;
