import React from "react";
import Section4Star from "@/public/images/Section4Star.svg";
import Section2Line from "../public/images/Section2Line.svg";

type Props = {};

const Section4 = (props: Props) => {
  return (
    <div className="h-screen px-10 flex flex-col justify-center items-center py-20">
      <div>
        <Section4Star className="w-[100px] h-[100px]" />
      </div>
      <div className="mt-8 text-center">
        <h1 className="text-6xl" style={{ fontFamily: "AbrilFatface-Regular" }}>
          Have a productive day
        </h1>
        <h1
          className="text-6xl mt-4"
          style={{ fontFamily: "AbrilFatface-Regular" }}
        >
          with
        </h1>
        <h1
          className="text-6xl mt-4"
          style={{ fontFamily: "AbrilFatface-Regular" }}
        >
          My Search Note
        </h1>
      </div>
    </div>
  );
};

export default Section4;
