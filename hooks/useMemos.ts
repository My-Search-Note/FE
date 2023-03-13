import { useAtom } from "jotai";
import { useEffect } from "react";
import {
  currentPageNumberAtom,
  nextPageDataAtom,
  currentPageDataAtom,
  nextPageMemosAtom,
  currentPageMemosAtom,
  searchQueryAtom,
  selectedMemoIdAtom,
  memoListAtom,
} from "@/atoms/memoAtoms";
import { MEMO_PAGE_SIZE } from "@/constant/memo";
import { getMemos, searchMemo, deleteMemo } from "@/apis/quickMemos";

//TODO:에러 처리

export const useMemos = () => {
  const [currentPageData, setCurrentPageData] = useAtom(currentPageDataAtom);
  const [currentPageMemos, setCurrentPageMemos] = useAtom(currentPageMemosAtom);
  const [nextPageData, setNextPageData] = useAtom(nextPageDataAtom);
  const [nextPageMemos, setNextPageMemos] = useAtom(nextPageMemosAtom);
  const [currentPageNumber, setCurrentPageNumber] = useAtom(
    currentPageNumberAtom
  );
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom);
  const [selectedMemoId, setSelectedMemoId] = useAtom(selectedMemoIdAtom);

  const getMemoData = async (pageNumber: number) => {
    try {
      const data = await (searchQuery.length > 0
        ? searchMemo(searchQuery, pageNumber)
        : getMemos(pageNumber));
      if (pageNumber === currentPageNumber) {
        setCurrentPageData(data);
        setCurrentPageMemos(data.memos);
      } else {
        setNextPageData(data);
        setNextPageMemos(data.memos);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleMoveToPage = (pageNumber: number) => {
    setCurrentPageNumber(pageNumber);

    let apiType;

    if (searchQuery.length > 0) {
      apiType = searchMemo(searchQuery, pageNumber);
    } else {
      apiType = getMemos(pageNumber);
    }

    apiType
      .then((data) => {
        setCurrentPageData(data);
        setCurrentPageMemos(data.memos);
      })
      .catch((error) => console.log(error));
  };

  const handleDeleteMemo = async (memoId: number) => {
    try {
      const response = await deleteMemo(memoId);
      setCurrentPageData((prevState) => ({
        ...prevState,
        total_count: prevState.total_count - 1,
        page_count: Math.ceil((prevState.total_count - 1) / MEMO_PAGE_SIZE),
      }));
      setCurrentPageMemos((prevMemos) => {
        const newMemos = prevMemos.filter((memo) => memo.id !== memoId);
        const nextMemos = nextPageMemos.slice(0, 5 - newMemos.length);
        const mergedMemos = [...newMemos, ...nextMemos];
        setNextPageMemos(nextPageMemos.slice(nextMemos.length));
        return mergedMemos;
      });
      if (
        nextPageMemos.length === 1 &&
        currentPageNumber < currentPageData.page_count
      ) {
        getMemoData(currentPageNumber + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchMemo = async (searchQuery: string, pageNumber: number) => {
    try {
      const response = await searchMemo(searchQuery, pageNumber);
      setCurrentPageData(response);
      setCurrentPageMemos(response.memos);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDropDownToggle = (memoId: number): void => {
    setSelectedMemoId((prevId) => (prevId === memoId ? null : memoId));
  };

  return {
    currentPageData,
    currentPageMemos,
    currentPageNumber,
    setCurrentPageNumber,
    searchQuery,
    setSearchQuery,
    selectedMemoId,
    getMemoData,
    handleMoveToPage,
    handleDeleteMemo,
    handleSearchMemo,
    handleDropDownToggle,
  };
};
