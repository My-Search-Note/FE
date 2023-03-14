import { useState, useRef } from "react";
import axios from "axios";
import { customsearch_v1 } from "googleapis";
import SearchIcon from "@mui/icons-material/Search";
import Pagination from "../common/Pagination";
import { useAtom } from "jotai";
import { searchAtom } from "@/atoms/searchAtoms";
import styles from "@/styles/searchStyle.module.scss";

type GoogleSearchResponse = customsearch_v1.Schema$Search;

type Props = {};

const SearchList = (props: Props) => {
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
      <div className="h-[4rem] flex items-center justify-center">
        <div className="w-1/2">
          <div className="w-full relative">
            <div className="absolute top-1.5 left-2">
              <SearchIcon className="text-gray-400 z-20 hover:text-gray-500" />
            </div>

            <input
              type="text"
              className="h-10 w-full pl-10 pr-3 rounded-lg z-0 text-md shadow outline-none"
              placeholder="Search anything..."
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleGetData();
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* Option Button */}
      <div className=" h-14 flex justify-center items-center">
        <div className="h-10 w-fit border-b border-slate-400 ">
          <button className="h-full mr-2 px-3 border-b-4 border-slate-500 font-semibold">
            Google
          </button>
          <button className="h-full px-3 rounded-lg">Github</button>
        </div>
      </div>

      {/* <SearchResult /> */}
      <div className="h-[calc(100%-7.5rem)]">
        <div
          className={`rounded-lg px-5 w-full h-[calc(100%-2.5rem)] grid grid-flow-row grid-rows-10 md:grid-cols-1 overflow-scroll  ${styles["cursor-pointer"]} ${styles["hide-scrollbar"]}`}
        >
          {searchResults.map((result: any) => (
            <div
              className="flex flex-col bg-white px-3 py-2 h-28 border-b-[2px] border-zinc-200 cursor-pointer"
              key={result.cacheId || result.id}
              onClick={() => handlePopUp(result.link)}
            >
              <p className="text-sm">{result.formattedUrl}</p>
              <h1 className="font-semibold text-lg">
                {result.title || result.full_name}
              </h1>
              <p>{result.snippet}</p>
            </div>
          ))}
        </div>

        <div className="h-10 bg-slate-100 flex justify-center items-center">
          <Pagination pageCount={1} />
        </div>
      </div>
    </div>
  );
};

export default SearchList;
