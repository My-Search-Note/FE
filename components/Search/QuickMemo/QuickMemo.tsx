import React, { useCallback, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import AddQuickMemo from "./AddQuickMemo";
import QuickMemoList from "./QuickMemoList";
import { useMemos } from "@/hooks/useMemos";
import { useSetAtom, useAtom, SetStateAction } from "jotai";
import { isAddClickedAtom, isShirinkAtom } from "@/atoms/memoAtoms";

type Props = {};

const QuickMemo = (props: Props) => {
  //TODO: 헤더 클릭하면 새로고침되도록 하기. (검색 후 돌아가기 용도)

  const {
    getMemoData,
    currentPageNumber,
    setCurrentPageNumber,
    setSearchQuery,
  } = useMemos();

  useEffect(() => {
    getMemoData(currentPageNumber);
    getMemoData(currentPageNumber + 1);
  }, [currentPageNumber]);

  //TODO: 이 코드 깔끔하게 정리할 것 + inputValue 삭제
  const handleClickHeader = async () => {
    setCurrentPageNumber(1);
    setSearchQuery("");
    await getMemoData(1);
    await getMemoData(2);
  };

  // UI

  const [isShrink, setIsShrink] = useAtom(isShirinkAtom);
  const [isAddClicked, setIsAddClicked] = useAtom(isAddClickedAtom);

  const toggleShirink = () => {
    setIsShrink((prev) => !prev);
  };

  const toggleAddClicked = () => {
    setIsAddClicked((prev) => !prev);
  };

  return (
    <motion.div
      initial={{ width: !isShrink ? "4rem" : "36rem" }}
      animate={{ width: isShrink ? "4rem" : "36rem" }}
      transition={{
        duration: 0.8,
      }}
      className="p-3 flex flex-col rounded-t-lg rounded-bl-lg bg-slate-400"
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
              onClick={toggleShirink}
            />
          </motion.div>
        </div>
        <div
          className="absolute top-[14px] w-full h-9 text-center flex justify-center items-center cursor-pointer"
          onClick={handleClickHeader}
        >
          <h1 className="font-semibold text-2xl">Quick Memo</h1>
        </div>
      </div>

      {/* 바디*/}
      <div className=" h-[calc(100%-4rem)] flex flex-col rounded-md">
        {!isAddClicked ? (
          <>
            <QuickMemoList handleAddClick={toggleAddClicked} />
          </>
        ) : (
          <AddQuickMemo handleAddClick={toggleAddClicked} />
        )}
      </div>

      {/* 버튼 */}
    </motion.div>
  );
};

export default QuickMemo;
