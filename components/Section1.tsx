import React from "react";
import Section1Bubble from "../public/images/Section1Bubble.svg";
import Section1Sparkle from "../public/images/Section1Sparkle.svg";
import { motion } from "framer-motion";

type Props = {};

const Variate = {
  animate: { y: 0, opacity: 1 },
  initaial: { y: 60, opacity: 0 },
};

const Section1 = (props: Props) => {
  return (
    <div className="h-screen px-10 flex justify-center">
      <div className="w-full h-[calc(100%-3.5rem)] p-12 flex flex-col md:flex-row items-center">
        <div className="md:w-2/5 flex flex-col items-center">
          <motion.h1
            animate={Variate.animate}
            initial={Variate.initaial}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl md:text-7xl text-center"
            style={{ fontFamily: "AbrilFatface-Regular" }}
          >
            Search it
          </motion.h1>
          <motion.h1
            animate={Variate.animate}
            initial={Variate.initaial}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-3xl md:text-7xl text-center"
            style={{ fontFamily: "AbrilFatface-Regular" }}
          >
            and
          </motion.h1>
          <motion.h1
            animate={Variate.animate}
            initial={Variate.initaial}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-3xl md:text-7xl  text-center"
            style={{ fontFamily: "AbrilFatface-Regular" }}
          >
            Note it
          </motion.h1>
          <motion.span
            animate={Variate.animate}
            initial={Variate.initaial}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-sm font-light mt-2 text-gray-600"
          >
            Lorem ipsum dolor sit amet,
            <br /> consectetur adipiscing elit,
            <br /> sed do eiusmod tempor incididunt
          </motion.span>
        </div>
        <div className="md:w-3/5 flex justify-center">
          <Section1Bubble
            width="500"
            height="500"
            className="md:w-[500px] relative"
          />
          <Section1Sparkle className="md:w-[650px] md:h-[650px] absolute top-24" />
          <img
            src="/images/Section1Model.png"
            alt="model"
            className="w-1/2 md:w-[450px] md:h-[450px] absolute top-1/2 md:top-1/3"
          />
        </div>
      </div>
    </div>
  );
};

export default Section1;
