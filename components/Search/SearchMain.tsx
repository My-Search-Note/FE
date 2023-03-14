import { useState, useRef } from "react";
import axios from "axios";
import { customsearch_v1 } from "googleapis";
import SearchIcon from "@mui/icons-material/Search";
import Pagination from "../common/Pagination";
import { useAtom } from "jotai";
import { searchAtom } from "@/atoms/searchAtoms";

type GoogleSearchResponse = customsearch_v1.Schema$Search;

type Props = {};

const SearchMain = (props: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const optionRef = useRef<HTMLSelectElement>(null);

  const [searchResults, setSearchResults] = useState([]);

  const [search, setSearch] = useAtom(searchAtom);

  async function handleGetData() {
    const option = "Google";
    const query = "하하";

    if (!query) {
      return;
    }

    const apiKey = "AIzaSyAjsmS6uirJK343FWznmLHvcy31GXD1vIg";
    const cx = "309ff7e23abf04c9a";

    let url = "";
    if (option === "Google") {
      url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${query}&start=2
      `;
    } else if (option === "Github") {
      url = `https://api.github.com/search/repositories?q=${query}`;
    } else {
      return;
    }

    try {
      const response = await axios.get<GoogleSearchResponse | any>(url);
      console.log(response);
      setSearchResults(response.data.items);
      console.log(searchResults);
    } catch (error) {
      console.error(error);
    }
  }

  const handlePopUp = (url: string) => {
    const width = 600;
    const height = 600;

    const left = window.innerWidth / 2 - width;
    const top = window.innerHeight / 2 - height / 2;

    const features = `width=${width},height=${height},left=${left},top=${top}`;
    const popup = window.open(url, "popup", features);
    popup?.focus();
  };

  //TODO:쿼리 없으면 검색창만 보이게.

  return (
    <div className="w-full h-full flex flex-col">
      <div className="h-full flex flex-col relative">
        <div className="h-[16rem] w-full bg-gray-700 flex flex-col px-5 py-3 saturate-50 bg-[url('/images/SearchMain.jpg')] bg-bottom bg-cover">
          <div className="h-[4rem] flex flex-col justify-center">
            <p className="font-semibold text-4xl">Good morning, guest!</p>
          </div>
          <p className="font-semibold">March 14th, 2023</p>
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
                    placeholder="Search on Google, Bing"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleGetData();
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
