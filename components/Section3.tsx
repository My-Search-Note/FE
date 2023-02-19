import React from "react";
import Section3Bubble from "../public/images/Section3Bubble.svg";
import Section3Sparkle1 from "../public/images/Section3Sparkle1.svg";
import { motion, useAnimation } from "framer-motion";

type Props = {};

const Variate = {
  animate: { y: 0, opacity: 1 },
  initaial: { y: 60, opacity: 0 },
};

const Section3 = (props: Props) => {
  return (
    <div className="h-screen px-10 flex overflow-hidden">
      <div className="px-12 w-2/5 h-full py-20 flex flex-col justify-between items-center">
        <motion.h1
          whileInView={Variate.animate}
          initial={Variate.initaial}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl md:text-5xl font-medium"
          style={{ fontFamily: "AbrilFatface-Regular" }}
        >
          Meet My Search Note
        </motion.h1>
        <img
          src="/images/Section3Model.png"
          alt="model"
          className="w-[300px] h-[400px] rounded-lg relative"
        />
      </div>
      <div className="flex w-3/5 flex-col items-center justify-between py-48 relative">
        <Section3Bubble className="absolute -right-16 top-0 w-[150px] h-[150px]" />
        <motion.div
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: 40 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <h1 className="text-2xl font-bold">Book-mark Search history</h1>
          <span className="text-md">
            psum has been the industry's standard <br /> dummy text ever since
            the 1500s, when an unknown printer
          </span>
        </motion.div>
        <motion.div
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: 40 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <h1 className="text-2xl font-bold">Book-mark Search history</h1>
          <span className="text-md">
            psum has been the industry's standard <br /> dummy text ever since
            the 1500s, when an unknown printer
          </span>
        </motion.div>
        <motion.div
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: 40 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <h1 className="text-2xl font-bold">Book-mark Search history</h1>
          <span className="text-md">
            psum has been the industry's standard <br /> dummy text ever since
            the 1500s, when an unknown printer
          </span>
        </motion.div>
      </div>
    </div>
  );
};

export default Section3;
