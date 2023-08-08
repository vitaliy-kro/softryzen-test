import { useEffect, useState } from "react";
import { GoChevronDown } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import { useDebounce } from "../hooks/useDebounce";
import { useCards } from "../hooks/useCards";

export const Header = () => {
  const [searchText, setSearchText] = useState("");

  const { searchCards } = useCards();
  const debouncedSearch = useDebounce(searchText, 500);

  useEffect(() => {
    searchCards(debouncedSearch);
  }, [debouncedSearch]);

  return (
    <header className="header border-b border-accent">
      <div className="container p-6  flex flex-wrap justify-between items-center gap-y-5 md:gap-y-0 md:gap-x-6 md:justify-normal">
        <h3 className="font-alata text-accent text-xl">Event Planner</h3>

        <button className="flexCenter gap-1 bg-white py-3 pl-3 pr-1 rounded-lg shadow-base md:order-3">
          <span className="font-poppins font-medium text-lg text-text leading-none">
            EN
          </span>
          <GoChevronDown className="icon" />
        </button>
        <div className="relative w-full md:w-[368px] md:order-2 md:ml-auto xl:w-[410px]">
          <CiSearch className="absolute top-1/2 transform -translate-y-1/2 left-3 text-accent w-6 h-6" />
          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search by keywords"
            className="w-full rounded-lg py-3 pr-3 pl-12 shadow-base placeholder:text-[#888] placeholder:font-poppins placeholder:font-light"
          />
        </div>
      </div>
    </header>
  );
};
