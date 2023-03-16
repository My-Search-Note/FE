import { useRef } from "react";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import { useAtom, useSetAtom } from "jotai";
import {
  searchPageSearchQueryAtom,
  searchPageSearchResultAtom,
} from "@/atoms/searchAtoms";
import { getSearchData } from "@/apis/SearchPage";
import Cookies from "js-cookie";

const SearchMain = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const setSearchResult = useSetAtom(searchPageSearchResultAtom);
  const setSearchPageSearchQuery = useSetAtom(searchPageSearchQueryAtom);

  const handleGetSearchData = async () => {
    try {
      const input = inputRef.current!.value;
      const searchData = await getSearchData(input);

      setSearchResult(searchData);
      setSearchPageSearchQuery(input);
    } catch (error) {
      console.error(error);
    }
  };

  const date = new Date().toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const Getgreeting = () => {
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
      return "Good morning";
    } else if (currentHour >= 12 && currentHour < 18) {
      return "Good afternoon";
    } else {
      return "Good evening";
    }
  };

  const greeting = Getgreeting();

  //TODO:게스트 이름 가져와서 변경하기

  //쿠키설정
  // let cookie = Cookies.get("searchHistory") || [];
  // cookie.push("어쩌고");

  return (
    <div className="w-full h-full flex flex-col">
      <div className="h-full flex flex-col relative">
        <div className="h-[16rem] w-full bg-gray-700 flex flex-col px-5 py-3 saturate-50 bg-[url('/images/SearchMain.jpg')] bg-bottom bg-cover">
          <div className="h-[4rem] flex flex-col justify-center">
            <p className="font-semibold text-4xl">{greeting}, guest!</p>
          </div>
          <p className="font-semibold">{date}</p>
        </div>

        <div className="h-[calc(100%-5rem)] absolute top-[10rem] bottom-0 left-0 right-0 p-3">
          <div className="h-full bg-white rounded-lg drop-shadow-xl flex flex-col justify-center items-center">
            {/* Searchbar, Search */}
            <div className="w-3/5 h-1/2 py-4 flex flex-col items-center justify-between">
              {/* Searchbar */}
              <div className="w-full h-fit">
                <h1 className="font-semibold text-2xl mb-3 ">Search</h1>
                <div className="relative">
                  <div className="absolute top-1.5 left-2">
                    <SearchIcon className="text-gray-400 z-20 hover:text-gray-500" />
                  </div>

                  <input
                    type="text"
                    className="h-10 w-full pl-10 pr-3 rounded-lg z-0 text-md shadow outline-none bg-slate-200"
                    placeholder="Search on Google, Youtube"
                    ref={inputRef}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleGetSearchData();
                      }
                    }}
                  />
                </div>
              </div>

              {/* Shirink & f */}
              <div className="max-h-50 h-fit w-full mt-11">
                <p className=" font-semibold text-zinc-600 mb-3">
                  Recently searched
                </p>
                <div className="grid grid-flow-row-dense grid-cols-3 grid-rows-2 gap-2">
                  <button className="border rounded-lg px-4 py-1">
                    자바스크립트 잘하는법
                  </button>
                  <button className="border rounded-lg px-4 py-1">
                    아이고 ~~~ 힘들다~~~~...
                  </button>
                  <button className="border rounded-lg px-4 py-1">
                    아이고 ~~~ 힘들다~~~~...
                  </button>
                  <button className="border rounded-lg px-4 py-1">
                    아이고 ~~~ 힘들다~~~~...
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchMain;
