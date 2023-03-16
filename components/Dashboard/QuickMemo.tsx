import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import axios from "axios";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import AddBoxIcon from "@mui/icons-material/AddBox";
import AddQuickMemo from "../Search/QuickMemo/AddQuickMemo";
import QuickMemoList from "../Search/QuickMemo/QuickMemoList";
import Cookies from "js-cookie";
import Searchbar from "../common/Searchbar";

type Props = {};

const QuickMemo = (props: Props) => {
  const [isAddClicked, setIsAddClicked] = useState(false);
  const handleAddClick = () => {
    setIsAddClicked(!isAddClicked);
  };

  //변수명 반대로 고치기
  const [isShrink, setIsShrink] = useState(true);

  const handleShrink = () => {
    setIsShrink(!isShrink);
  };

  const handleSearch = () => {};

  return (
    <motion.div
      initial={{ width: isShrink ? "4%" : "40%" }}
      animate={{ width: !isShrink ? "4%" : "40%" }}
      transition={{
        duration: 0.8,
      }}
      className="bg-slate-50 h-2/5 p-3 flex flex-col rounded-t-lg  md:h-full md:w-2/5 md:rounded-l-lg"
    >
      <div className="h-7 flex flex-start">
        <motion.div
          className="flex justify-center items-center"
          initial={{ rotate: isShrink ? "180deg" : "0deg" }}
          animate={{ rotate: !isShrink ? "180deg" : "0deg" }}
        >
          <ArrowForwardIosRoundedIcon
            className="cursor-pointer"
            onClick={handleShrink}
          />
        </motion.div>
      </div>
      <div className="h-7 mb-2 flex gap-x-4 justify-center items-center overflow">
        <h1 className="font-semibold text-xl md:text-xl">Quick Memo</h1>
      </div>

      {/* 이 컴포넌트 안에서 작성, 노트 띄움. 얘가 래퍼임.*/}
      <div className="bg-gray-100 h-[calc(100%-3.5rem)] flex flex-col p-2 rounded-md overflow-y-scroll">
        {!isAddClicked ? (
          <QuickMemoList handleAddClick={handleAddClick} />
        ) : (
          <AddQuickMemo handleAddClick={handleAddClick} />
        )}
      </div>
    </motion.div>
  );
};

export default QuickMemo;
