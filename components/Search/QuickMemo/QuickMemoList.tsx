import React, { useState, useEffect, use } from "react";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import DehazeRoundedIcon from "@mui/icons-material/DehazeRounded";
import Box from "@/components/common/Box";
import Searchbar from "@/components/common/Searchbar";
import { getMemos } from "@/apis/quickMemos";
import Pagination from "@/components/common/Pagination";

type Props = {
  handleAddClick: () => void;
};

type Memo = {
  id: number;
  title: string;
  content: string;
  user_id: number;
  created_at: string;
};

type MemoPaginationData = {
  memos: Memo[];
  page_count: number;
  total_count: number;
};

const QuickMemoList = ({ handleAddClick }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropDown = () => {
    setIsOpen(!isOpen);
  };

  const [memos, setMemos] = useState<MemoPaginationData>();

  useEffect(() => {
    getMemos()
      .then((memos) => {
        setMemos(memos);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    console.log(memos);
  }, [memos]);

  const onDragStart = () => {
    //메모 내용 가져오기
  };
  return (
    <div className="bg-slate-300 h-[calc(100%-2.5rem)]">
      <div className="h-24">
        <div className="h-14 w-full flex justify-center">
          <Searchbar />
          <button
            className="bg-yellow-300 h-10 rounded-lg ml-3 px-3 flex items-center justify-center shadow outline-none"
            onClick={handleAddClick}
          >
            <AddCircleOutlineRoundedIcon className="mr-2" />
            Add
          </button>
        </div>
        <div className="h-10 mb-1 px-3 flex justify-between items-center border-t border-t-gray-300">
          {memos && (
            <p className="text-sm font-semibold text-gray-500">
              {memos.total_count} {memos.total_count > 1 ? "Memos" : "Memo"}
            </p>
          )}
        </div>
      </div>

      <div className=" h-[calc(100%-6rem)] grid grid-flow-col grid-cols-2 md:grid-flow-row md:gap-y-1 md:grid-rows-6 md:grid-cols-1">
        <Box>
          <div className="flex justify-between">
            <p className="text-xs text-gray-400">2023.03.03</p>
            <div className="relative">
              <DehazeRoundedIcon
                className="text-sm text-gray-400 cursor-pointer"
                onClick={toggleDropDown}
              />

              {isOpen && (
                <div className="absolute right-0 text-center z-10 w-16 bg-white rounded-md shadow-xl">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  >
                    edit
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  >
                    delete
                  </a>
                </div>
              )}
            </div>
          </div>
          <h2 className="text-md font-medium text-gray-900 overflow-hidden overflow-ellipsis line-clamp-1">
            타이틀
          </h2>
          <p className="text-sm text-gray-600 overflow-hidden overflow-ellipsis line-clamp-2">
            내용내용내용
          </p>
        </Box>
      </div>

      {/* pagination */}
      <div className="h-10 flex justify-center items-center">
        <Pagination page_count={memos?.page_count ?? 1} />
      </div>
    </div>
  );
};

export default QuickMemoList;
