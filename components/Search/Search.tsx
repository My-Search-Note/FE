import { useState, useRef } from "react";
import axios from "axios";
import { customsearch_v1 } from "googleapis";

type GoogleSearchResponse = customsearch_v1.Schema$Search;

type Props = {};

const Search = (props: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const optionRef = useRef<HTMLSelectElement>(null);

  const [searchResults, setSearchResults] = useState([]);

  async function handleGetData() {
    const option = optionRef.current?.value;
    const query = inputRef.current?.value;

    if (!query) {
      return;
    }

    const apiKey = "AIzaSyAjsmS6uirJK343FWznmLHvcy31GXD1vIg";
    const cx = "309ff7e23abf04c9a";

    let url = "";
    if (option === "Google") {
      url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${query}`;
    } else if (option === "Github") {
      url = `https://api.github.com/search/repositories?q=${query}`;
    } else {
      return;
    }

    try {
      const response = await axios.get<GoogleSearchResponse | any>(url);
      setSearchResults(response.data.items);
      console.log(searchResults);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="w-full flex flex-col px-5 py-3">
      <label className="flex" htmlFor="sarch">
        <select
          defaultValue="Google"
          ref={optionRef}
          className="w-1/6 h-8 flex text-center rounded-tl-lg rounded-bl-lg"
        >
          <option value="Google">Google</option>
          <option value="Github">Github</option>
        </select>
        <input
          id="search"
          type="text"
          className="w-4/6 h-8 box-border px-3 py-1"
          ref={inputRef}
        />
        <button
          className="bg-amber-100 w-1/6 h-8 box-border rounded-tr-lg rounded-br-lg"
          onClick={handleGetData}
        >
          Search
        </button>
      </label>
      {/* <SearchResult /> */}
      {searchResults.map((result: any) => (
        <li key={result.cacheId || result.id}>
          <a href={result.link || result.html_url}>
            {result.formattedUrl}
            <h1>{result.title || result.full_name}</h1>
            <p>{result.snippet}</p>
          </a>
        </li>
      ))}
    </div>
  );
};

export default Search;
