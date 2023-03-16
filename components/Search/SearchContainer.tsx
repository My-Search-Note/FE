import { useEffect } from "react";
import { useAtomValue, useAtom, atom } from "jotai";
import { searchPageSearchQueryAtom } from "@/atoms/searchAtoms";
import SearchMain from "./SearchMain";
import SearchList from "./SearchList";

const SearchContainer = () => {
  const searchPageSearchQuery = useAtomValue(searchPageSearchQueryAtom);

  return (
    <div className="w-full h-full flex flex-col">
      {searchPageSearchQuery.length > 0 ? <SearchList /> : <SearchMain />}
    </div>
  );
};

export default SearchContainer;
