import React, { useState, useEffect } from "react";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import DehazeRoundedIcon from "@mui/icons-material/DehazeRounded";
import Box from "@/components/common/Box";
import Searchbar from "@/components/common/Searchbar";
import { addMemo, deleteMemo, getMemos, searchMemo } from "@/apis/quickMemos";
import Pagination from "@/components/common/Pagination";
import axios from "axios";
import axiosConfing from "@/apis/axiosConfig";
import { MemoContent, Memo, MemoPaginationData } from "@/interfaces/memo";

type Props = {
  handleAddClick: () => void;
};

const QuickMemoList = ({ handleAddClick }: Props) => {
  const [data, setData] = useState<MemoPaginationData>({
    memos: [],
    total_count: 0,
    page_count: 1,
  });
  const [nextPageData, setNextPageData] = useState<MemoPaginationData>({
    memos: [],
    total_count: 0,
    page_count: 2,
  });

  const PAGE_SIZE = 5;

  const [memos, setMemos] = useState<Memo[]>([]);
  const [nextPageMemos, setNextPageMemos] = useState<Memo[]>([]);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [selectedMemoId, setSelectedMemoId] = useState<number | null>(null);
  const [memoList, setMemoList] = useState<JSX.Element[] | null>(null);

  const fetchData = async (page: number) => {
    try {
      const data = await (searchQuery.length > 0
        ? searchMemo(searchQuery, page)
        : getMemos(page));
      if (page === currentPage) {
        setData(data);
        setMemos(data.memos);
      } else {
        setNextPageData(data);
        setNextPageMemos(data.memos);
      }
    } catch (error) {
      console.error(error);
    }
  };

  //삭제용.
  useEffect(() => {
    fetchData(currentPage);
    fetchData(currentPage + 1);
  }, [currentPage]);

  //페이지네이션
  const handlePageClck = (pageNumber: number) => {
    setCurrentPage(pageNumber);

    let apiType;

    if (searchQuery.length > 0) {
      apiType = searchMemo(searchQuery, pageNumber);
    } else {
      apiType = getMemos(pageNumber);
    }

    apiType
      .then((data) => {
        setData(data);
        setMemos(data.memos);
      })
      .catch((error) => console.log(error));
  };

  //삭제
  const handleMemoDelete = async (memoId: number) => {
    try {
      const response = await deleteMemo(memoId);
      setData((prevState) => ({
        ...prevState,
        total_count: prevState.total_count - 1,
        page_count: Math.ceil((prevState.total_count - 1) / PAGE_SIZE),
      }));
      setMemos((prevMemos) => {
        const newMemos = prevMemos.filter((memo) => memo.id !== memoId);
        const nextMemos = nextPageMemos.slice(0, 5 - newMemos.length);
        const mergedMemos = [...newMemos, ...nextMemos];
        setNextPageMemos(nextPageMemos.slice(nextMemos.length));
        return mergedMemos;
      });
      if (nextPageMemos.length === 1 && currentPage < data.page_count) {
        fetchData(currentPage + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //검색 API 호출
  const handleSearchMemo = async (searchQuery: string, currentPage: number) => {
    try {
      const response = await searchMemo(searchQuery, currentPage);
      setData(response);
      setMemos(response.memos);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  //드롭다운 토글
  const toggleDropDown = (memoId: number): void => {
    setSelectedMemoId((prevId) => (prevId === memoId ? null : memoId));
  };

  return (
    <div className="bg-slate-300 h-[calc(100%-2.5rem)]">
      <div className="h-24">
        <div className="h-14 w-full flex justify-center">
          {/* <Searchbar /> */}
          <button
            onClick={() => {
              handleSearchMemo(searchQuery, currentPage);
            }}
          >
            검색하는거임
          </button>
          <button
            className="bg-yellow-300 h-10 rounded-lg ml-3 px-3 flex items-center justify-center shadow outline-none"
            onClick={handleAddClick}
          >
            <AddCircleOutlineRoundedIcon className="mr-2" />
            Add
          </button>
        </div>
        <div className="h-10 mb-1 px-3 flex justify-between items-center border-t border-t-gray-300">
          {data && (
            <p className="text-sm font-semibold text-gray-500">
              {data.total_count} {data.total_count > 1 ? "Memos" : "Memo"}
            </p>
          )}
        </div>
      </div>

      <div className=" h-[calc(100%-6rem)] grid grid-flow-col grid-cols-1 grid-rows-5 md:grid-flow-row md:gap-y-1 md:grid-rows-5 md:grid-cols-1">
        {memos.map((memo) => (
          <Box key={memo.id}>
            <div className="flex justify-between">
              <p className="text-xs text-gray-400">{memo.created_at}</p>
              <div className="relative">
                <DehazeRoundedIcon
                  className="text-sm text-gray-400 cursor-pointer"
                  onClick={() => {
                    toggleDropDown(memo.id);
                  }}
                />

                {selectedMemoId === memo.id && (
                  <div className="absolute right-0 text-center z-10 w-16 bg-white rounded-md shadow-xl">
                    <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                      edit
                    </button>
                    <button
                      onClick={() => {
                        handleMemoDelete(memo.id);
                      }}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    >
                      delete
                    </button>
                  </div>
                )}
              </div>
            </div>
            <h2 className="text-md font-medium text-gray-900 overflow-hidden overflow-ellipsis line-clamp-1">
              {memo.title}
            </h2>
            <p className="text-sm text-gray-600 overflow-hidden overflow-ellipsis line-clamp-2">
              {memo.content}
            </p>
          </Box>
        ))}
      </div>

      {/* pagination */}
      <div className="h-10 flex justify-center items-center">
        <Pagination
          pageCount={data?.page_count ?? 1}
          handlePageClick={handlePageClck}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default QuickMemoList;
