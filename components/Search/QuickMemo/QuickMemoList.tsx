import React from "react";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import DehazeRoundedIcon from "@mui/icons-material/DehazeRounded";
import Box from "@/components/common/Box";
import Searchbar from "@/components/common/Searchbar";
import Pagination from "@/components/common/Pagination";
import { useMemos } from "@/hooks/useMemos";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

type Props = {
  handleAddClick: () => void;
};

const QuickMemoList = ({ handleAddClick }: Props) => {
  const {
    currentPageData,
    currentPageMemos,
    selectedMemoId,
    currentPageNumber,
    handleDropDownToggle,
    handleDeleteMemo,
    handleMoveToPage,
  } = useMemos();

  return (
    <div className="h-[calc(100%-2.5rem)]">
      <div className="h-24">
        <div className="h-10 w-full">
          <Searchbar />
        </div>
        <div className="h-14 flex justify-between items-center">
          {currentPageData && (
            <p className="text-sm font-semibold">
              {currentPageData.total_count}{" "}
              {currentPageData.total_count > 1 ? "Memos" : "Memo"}
            </p>
          )}
          <button
            onClick={handleAddClick}
            className="bg-yellow-300 rounded-lg py-2 px-4 flex items-center justify-center shadow outline-none"
          >
            <AddRoundedIcon className="text-sm font-semibold" />
          </button>
        </div>
      </div>

      <div className=" h-[calc(100%-6rem)] grid grid-flow-col grid-cols-1 grid-rows-5 md:grid-flow-row md:gap-y-1 md:grid-rows-5 md:grid-cols-1">
        {currentPageMemos.map((memo) => (
          <Box key={memo.id}>
            <div className="flex justify-between">
              <p className="text-xs text-gray-400">{memo.created_at}</p>
              <div className="relative">
                <DehazeRoundedIcon
                  className="text-sm text-gray-400 cursor-pointer"
                  onClick={() => {
                    handleDropDownToggle(memo.id);
                  }}
                />

                {selectedMemoId === memo.id && (
                  <div className="absolute right-0 text-center z-10 w-16 bg-white rounded-md shadow-xl">
                    <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                      edit
                    </button>
                    <button
                      onClick={() => {
                        handleDeleteMemo(memo.id);
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
          pageCount={currentPageData?.page_count ?? 1}
          handlePageClick={handleMoveToPage}
          currentPage={currentPageNumber}
        />
      </div>
    </div>
  );
};

export default QuickMemoList;
