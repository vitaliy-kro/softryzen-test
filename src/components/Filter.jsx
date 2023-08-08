import { useState, useEffect } from "react";
import { CiFilter } from "react-icons/ci";
import { BiSliderAlt } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import {
  CATEGORY_FIELDS,
  ROUTER_KEYS,
  SCREEN_WIDTHS,
  SORT_FIELDS,
} from "../consts";
import { NavLink } from "react-router-dom";
import { FiltersDropdown } from "./FiltersDropdown";
import { useCards } from "../hooks/useCards";

export const Filter = ({ screenWidth }) => {
  const { filterCards } = useCards();

  const [category, setCategory] = useState("");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const [sort, setSort] = useState("");
  const [isSortOpen, setIsSortOpen] = useState(false);

  useEffect(() => {
    if (category || sort) {
      filterCards({
        category: category.name,
        sortOrder: sort.sortOrder,
      });
    }
  }, [category, sort]);

  const MIN_TABLET_SCREEN_WIDTH = screenWidth >= SCREEN_WIDTHS.tablet;
  const MIN_DESKTOP_SCREEN_WIDTH = screenWidth >= SCREEN_WIDTHS.desktop;
  const Icon = sort.icon;
  const isSortedByName =
    sort.sortOrder === "by A-Z" || sort.sortOrder === "by Z-A";

  return (
    <div className="filter">
      <div className="md:relative">
        <button
          className={`filter__button ${category ? "!text-accent" : ""}`}
          onClick={() => setIsCategoryOpen((prev) => !prev)}
        >
          {MIN_TABLET_SCREEN_WIDTH && (
            <span className="filter__text">{category.name || "Category"}</span>
          )}
          <CiFilter className="icon" />
        </button>

        <FiltersDropdown
          isOpen={isCategoryOpen}
          onChange={() => setIsCategoryOpen(false)}
          fields={CATEGORY_FIELDS}
          value={category}
          onSelect={setCategory}
          icon={CiFilter}
          isTablet={MIN_TABLET_SCREEN_WIDTH}
          title="Category"
        />
      </div>
      <div className="md:relative">
        <button
          className={`filter__button ${sort ? "!text-accent" : ""}`}
          onClick={() => setIsSortOpen((prev) => !prev)}
        >
          {MIN_TABLET_SCREEN_WIDTH && (
            <span>
              Sort{" "}
              {MIN_DESKTOP_SCREEN_WIDTH && sort.sortOrder
                ? (isSortedByName && sort.sortOrder) || sort.name
                : "by"}
            </span>
          )}
          {MIN_DESKTOP_SCREEN_WIDTH && sort.sortOrder ? (
            <Icon className="icon" />
          ) : (
            <BiSliderAlt className="icon" />
          )}
        </button>

        <FiltersDropdown
          isOpen={isSortOpen}
          onChange={() => setIsSortOpen(false)}
          fields={SORT_FIELDS}
          value={sort}
          onSelect={setSort}
          isTablet={MIN_TABLET_SCREEN_WIDTH}
          icon={BiSliderAlt}
          title="Sort by"
        />
      </div>

      <NavLink
        to={ROUTER_KEYS.ADD_NEW_CARD}
        className="filter__button !bg-accent !text-white"
      >
        <AiOutlinePlus className="icon" />
        {MIN_TABLET_SCREEN_WIDTH && <span>Add new event</span>}
      </NavLink>
    </div>
  );
};
