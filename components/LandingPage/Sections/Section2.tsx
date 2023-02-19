import { useState, useRef } from "react";
import Section2Bubble from "@/public/images/Section2Bubble.svg";
import Section2Line from "../public/images/Section2Line.svg";
import {
  motion,
  useMotionValue,
  useAnimationFrame,
  useTransform,
} from "framer-motion";
import { type } from "os";

type Props = {};

const Section2 = (props: Props) => {
  //useCycle사용하기. 하나만 기본값 높게.

  return (
    <div className="h-screen flex flex-col justify-between px-10 pt-20 pb-40">
      <div className="relative">
        <motion.h1
          className="text-4xl md:text-5xl font-medium absolute left-20"
          style={{ fontFamily: "AbrilFatface-Regular" }}
          whileInView={{ opacity: 1, x: 20 }}
          initial={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Have you ever thought like this?
        </motion.h1>
        <Section2Bubble
          width="150"
          height="150"
          className="absolute left-[-100px] top-[-10px]"
        />
      </div>
      <div className="flex gap-6 justify-center">
        <motion.div
          initial={{ opacity: 0.8, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, delay: 0, type: "spring" }}
          className="w-60 h-60 p-4 bg-[#f7b3c7] rounded-lg shadow-lg cursor-pointer text-center flex flex-col justify-center"
        >
          <span className="text-3xl font-semibold">
            "I want to bookmark what I searched."
          </span>
          <span className="block mt-2 text-3xl">🤔</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0.8, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, delay: 0.1, type: "spring" }}
          className="w-60 h-60 p-4 bg-[#c6dc60] rounded-lg shadow-lg cursor-pointer text-center flex flex-col justify-center"
        >
          <span className="text-3xl font-semibold">
            "I want to bookmark what I searched."
          </span>
          <span className="block mt-2 text-3xl">😥</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0.8, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, delay: 0.2, type: "spring" }}
          className="w-60 h-60 p-4 bg-[#c3acf1] rounded-lg drop-shadow-lg cursor-pointer text-center flex flex-col justify-center"
        >
          <span className="text-3xl font-semibold">
            "I want to bookmark what I searched."
          </span>
          <span className="block mt-2 text-3xl">🙄</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0.8, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, delay: 0.3, type: "spring" }}
          className="w-60 h-60 p-4 bg-[#ee4878] rounded-lg shadow-lg cursor-pointer text-center flex flex-col justify-center"
        >
          <span className="text-3xl font-semibold">
            "I'd like to take a note of what I searched."
          </span>
          <span className="block mt-2 text-3xl">🥺</span>
        </motion.div>
      </div>
    </div>
  );
};

export default Section2;
