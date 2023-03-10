import React, { useState, useEffect } from "react";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import DehazeRoundedIcon from "@mui/icons-material/DehazeRounded";
import Box from "@/components/common/Box";
import Searchbar from "@/components/common/Searchbar";
import { getMemos } from "@/apis/quickMemo";

type Props = {
  handleAddClick: () => void;
};

type Memo = {
  id: number;
  title: string;
  content: string;
  user_id: number;
};

const QuickMemoList = ({ handleAddClick }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropDown = () => {
    setIsOpen(!isOpen);
  };

  const [memos, setMemos] = useState<readonly Memo[]>([]);

  useEffect(() => {
    getMemos()
      .then((memos) => setMemos(memos))
      .catch((error) => console.error(error));
  }, []);

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
          <p className="text-sm font-semibold text-gray-500">42 Memos</p>
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
        <nav aria-label="Page navigation example">
          <ul className="list-style-none flex">
            <li>
              <a
                className="relative block rounded bg-transparent py-1.5 px-3 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
                href="#"
                aria-label="Previous"
              >
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li>
              <a
                className="relative block rounded bg-transparent py-1.5 px-3 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
                href="#"
              >
                1
              </a>
            </li>
            <li aria-current="page">
              <a
                className="relative block rounded bg-transparent py-1.5 px-3 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
                href="#"
              >
                2
              </a>
            </li>
            <li>
              <a
                className="relative block rounded bg-transparent py-1.5 px-3 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
                href="#"
                aria-label="Next"
              >
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default QuickMemoList;
