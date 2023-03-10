import React from "react";
import SearchIcon from "@mui/icons-material/Search";

const Searchbar = () => {
  return (
    <div className="w-full relative">
      <div className="absolute top-1.5 left-2">
        <SearchIcon className="text-gray-400 z-20 hover:text-gray-500" />
      </div>
      <input
        type="text"
        className="h-10 w-full pl-10 pr-3 rounded-lg z-0 text-md shadow outline-none"
        placeholder="Search"
      />
    </div>
  );
};

export default Searchbar;
