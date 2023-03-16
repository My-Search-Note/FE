import { useEffect, useRef } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Pagination from "../common/Pagination";
import { useAtom, atom, useAtomValue } from "jotai";
import {
  searchPageSearchResultAtom,
  searchPageSearchQueryAtom,
  searchPageSearchOptiontAtom,
  apisearchResultAtom,
} from "@/atoms/searchAtoms";
import { getSearchData } from "@/apis/SearchPage";
import styles from "@/styles/searchStyle.module.scss";
import { searchQueryAtom } from "@/atoms/memoAtoms";

interface GoogleSearchResult {
  cacheId?: string;
  title: string;
  snippet: string;
  link: string;
  formattedUrl: string;
  source: string;
}

interface Thumbnail {
  url: string;
}

interface Thumbnails {
  default: Thumbnail;
}

interface YoutubeSearchResult {
  etag: string;
  id: {
    videoId: string;
  };
  title: string;
  link: string;
  formattedUrl: string;
  snippet: {
    title: string;
    description: string;
    thumbnails: Thumbnails;
  };
  nextPageToken: string;
  pageInfo: {
    resultsPerPage: number;
    totalResults: number;
  };
  source: "youtube";
}
type CombinedResult = GoogleSearchResult | YoutubeSearchResult;

const SearchList = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const googleOptionRef = useRef<HTMLButtonElement>(null);
  const youtubeOptionRef = useRef<HTMLButtonElement>(null);

  const [searchResult, setSearchResult] = useAtom(searchPageSearchResultAtom);
  const [apiSearchResult, setApiSearchResult] = useAtom(apisearchResultAtom);

  const [searchPageSearchQuery, setSearchPageSearchQuery] = useAtom(
    searchPageSearchQueryAtom
  );

  const [searchOptiont, setSearchOption] = useAtom(searchPageSearchOptiontAtom);

  const handlePopUp = (url: string) => {
    const width = 600;
    const height = 600;

    const left = window.innerWidth / 2 - width;
    const top = window.innerHeight / 2 - height / 2;

    const features = `width=${width},height=${height},left=${left},top=${top}`;
    const popup = window.open(url, "popup", features);
    popup?.focus();
  };

  const handleGetSearchData = async (searchOptiont: string) => {
    try {
      const input = inputRef.current!.value;
      const option = searchOptiont;
      const searchData = await getSearchData(input, option);

      setSearchResult(searchData);
      setSearchPageSearchQuery(input);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleGetSearchData(searchOptiont);
  }, [searchOptiont]);

  console.log(searchResult);

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
              defaultValue={searchPageSearchQuery}
              ref={inputRef}
              className="h-10 w-full pl-10 pr-3 rounded-lg z-0 text-md shadow outline-none"
              placeholder="Search anything..."
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleGetSearchData(searchOptiont);
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* Option Button */}
      <div className=" h-14 flex justify-center items-center">
        <div className="h-10 w-fit border-b border-slate-400 ">
          <button
            className={`h-full mr-2 px-3 font-semibold border-b-2 ${
              searchOptiont === "google"
                ? "border-slate-500"
                : "border-transparent"
            }  focus:outline-none`}
            value={"google"}
            ref={googleOptionRef}
            onClick={() => {
              setSearchOption("google");
            }}
          >
            Google
          </button>
          <button
            className={`h-full mr-2 px-3 font-semibold border-b-2 ${
              searchOptiont === "youtube"
                ? "border-slate-500"
                : "border-transparent"
            } focus:outline-none`}
            value={"youtube"}
            ref={youtubeOptionRef}
            onClick={() => {
              setSearchOption("youtube");
            }}
          >
            Youtube
          </button>
        </div>
      </div>

      {/* <SearchResult /> */}
      <div className="h-[calc(100%-7.5rem)]">
        <div
          className={`rounded-lg px-5 w-full h-[calc(100%-2.5rem)] grid grid-flow-row grid-rows-10 md:grid-cols-1 overflow-scroll  ${styles["cursor-pointer"]} ${styles["hide-scrollbar"]}`}
        >
          {searchResult &&
            searchResult.map((result) => {
              console.log(result);
              const isYoutube = result.source === "youtube";
              const key = isYoutube ? result.etag : result.cacheId;

              const handlePopUp = (link: string) => {
                window.open(link, "_blank");
              };

              return (
                <div
                  className="flex flex-col bg-white px-3 py-2 h-28 border-b-[2px] border-zinc-200 cursor-pointer"
                  key={key}
                  onClick={() => handlePopUp(result.link)}
                >
                  {!isYoutube && result.formattedUrl && (
                    <p className="text-sm">{result.formattedUrl}</p>
                  )}
                  <h1 className="font-semibold text-lg">{result.title}</h1>
                  <p>{isYoutube ? result.description : result.snippet}</p>
                </div>
              );
            })}
        </div>
      </div>

      <div className="h-10 bg-slate-100 flex justify-center items-center">
        <Pagination pageCount={1} />
      </div>
    </div>
  );
};

export default SearchList;
