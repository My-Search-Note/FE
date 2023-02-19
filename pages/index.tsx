import React from "react";
import Nav from "@/components/Nav";
import Slide from "@/components/Slide";
import Section1 from "@/components/Section1";
import Section2 from "@/components/Section2";
import Section3 from "@/components/Section3";
import Section4 from "@/components/Section4";

type Props = {};

const index = (props: Props) => {
  return (
    <div className="h-fit flex flex-col">
      <Nav />
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
    </div>
  );
};

export default index;
