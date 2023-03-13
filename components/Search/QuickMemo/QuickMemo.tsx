import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import AddQuickMemo from "./AddQuickMemo";
import QuickMemoList from "./QuickMemoList";

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

  //TODO: 헤더 클릭하면 새로고침되도록 하기. (검색 후 돌아가기 용도)

  return (
    <motion.div
      initial={{ width: isShrink ? "4rem" : "36rem" }}
      animate={{ width: !isShrink ? "4rem" : "36rem" }}
      transition={{
        duration: 0.8,
      }}
      className="p-3 flex flex-col rounded-t-lg"
    >
      {/* 헤더 */}
      <div className="h-16 relative">
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
        <div className="absolute top-[14px] w-full h-9 text-center flex justify-center items-center">
          <h1 className="font-semibold text-2xl">Quick Memo</h1>
        </div>
      </div>

      {/* 바디*/}
      <div className=" h-[calc(100%-4rem)] flex flex-col rounded-md">
        {!isAddClicked ? (
          <>
            <QuickMemoList handleAddClick={handleAddClick} />
          </>
        ) : (
          <AddQuickMemo handleAddClick={handleAddClick} />
        )}
      </div>

      {/* 버튼 */}
    </motion.div>
  );
};

export default QuickMemo;
