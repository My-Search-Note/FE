import React, { useEffect } from "react";
import { useAtom, useSetAtom } from "jotai";
import { useRouter } from "next/router";
import AddQuickMemo from "./MemoForm";
import QuickMemoList from "./MemoList";
import {
  isMemoFormVisibleAtom,
  memoSearchQuery,
  currentPageNumberAtom,
  memoModeAtom,
} from "@/atoms/quickMemoAtoms";

const QuickMemo = () => {
  const [isMemoFormVisible, setIsMemoFormVisible] = useAtom(
    isMemoFormVisibleAtom
  );
  const [memoMode, setMemoMode] = useAtom(memoModeAtom);

  const setCurrentPageNumber = useSetAtom(currentPageNumberAtom);
  const setSearchQuery = useSetAtom(memoSearchQuery);

  const router = useRouter();

  const handleResetPage = () => {
    setCurrentPageNumber(1);
    setSearchQuery("");
  };

  const toggleState = (
    setState: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setState((prev) => !prev);
  };

  //back back반복되는 문제 수정.
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        router.back();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [router]);

  return (
    <div className="p-3 lg:flex flex-col bg-white w-full h-full">
      <div className="h-16 relative ">
        <div
          className="absolute top-[14px] w-full h-9 text-center flex justify-center items-center cursor-pointer"
          onClick={handleResetPage}
        >
          <h1 className="font-semibold text-2xl">Quick Memo</h1>
        </div>
      </div>
      <div className=" h-[calc(100%-4rem)] flex flex-col rounded-md">
        {isMemoFormVisible ? (
          <AddQuickMemo
            mode={memoMode}
            handleMemoFormVisible={() => {
              toggleState(setIsMemoFormVisible);
            }}
          />
        ) : (
          <QuickMemoList
            handleMemoFormVisible={() => {
              toggleState(setIsMemoFormVisible);
              setMemoMode("add");
            }}
          />
        )}
      </div>
    </div>
  );
};

export default QuickMemo;
