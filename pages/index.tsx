import React from "react";
import Section1 from "@/components/LandingPage/Sections/Section1";
import Section2 from "@/components/LandingPage/Sections/Section2";
import Section3 from "@/components/LandingPage/Sections/Section3";
import Section4 from "@/components/LandingPage/Sections/Section4";
import Header from "@/components/LandingPage/Header";

type Props = {};

const index = (props: Props) => {
  return (
    <div className="h-fit flex flex-col">
      <Header />
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
    </div>
  );
};

export default index;
