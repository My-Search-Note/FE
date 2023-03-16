import React, { useMemo } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useMemos } from "@/hooks/useMemos";

const Searchbar = () => {
  const { handleSearchMemo, searchQuery, setSearchQuery, currentPageNumber } =
    useMemos();

  return (
    <div className="w-full relative">
      <div className="absolute top-1.5 left-2">
        <SearchIcon className="text-gray-400 z-20 hover:text-gray-500" />
      </div>

      <input
        type="text"
        className="h-10 w-full pl-10 pr-3 rounded-lg z-0 text-md shadow border outline-none"
        placeholder="Search"
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearchMemo(searchQuery, currentPageNumber);
          }
        }}
      />
    </div>
  );
};

export default Searchbar;
