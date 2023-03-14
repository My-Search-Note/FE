import { useState, useRef } from "react";
import axios from "axios";
import { customsearch_v1 } from "googleapis";
import SearchIcon from "@mui/icons-material/Search";
import Pagination from "../common/Pagination";
import { useAtom } from "jotai";
import { searchAtom } from "@/atoms/searchAtoms";
import SearchList from "./SearchList";
import SearchMain from "./SearchMain";

type GoogleSearchResponse = customsearch_v1.Schema$Search;

type Props = {};

const Search = (props: Props) => {
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
      {/* {search.length === 0 ? <SearchMain /> : <SearchList />} */}
      <SearchMain />
      {/* <SearchList /> */}
    </div>
  );
};

export default Search;
