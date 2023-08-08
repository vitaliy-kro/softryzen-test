import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import ReactPaginate from "react-paginate";
import { useCards } from "../hooks/useCards";
import { SCREEN_WIDTHS } from "../consts";

export const Pagination = ({ screenWidth }) => {
  const { page, setPage, getCardsToShow } = useCards();
  const pages = getCardsToShow().pages;
  const pageRange = screenWidth >= SCREEN_WIDTHS.tablet ? 3 : 2;

  return (
    <ReactPaginate
      pageCount={pages}
      previousLabel={<GoChevronLeft className="icon" />}
      pageRangeDisplayed={pageRange}
      marginPagesDisplayed={1}
      forcePage={page - 1}
      nextLabel={<GoChevronRight className="icon" />}
      pageClassName="pagination-button"
      activeClassName="pagination-button isActive"
      nextClassName="pagination-button isActive"
      nextLinkClassName="icon"
      previousClassName="pagination-button isActive"
      previousLinkClassName="icon"
      disabledLinkClassName="icon cursor-not-allowed"
      disabledClassName="!text-devider"
      onPageChange={({ selected }) => {
        setPage(selected + 1);
      }}
      breakLabel="..."
      breakClassName="pagination-button"
      renderOnZeroPageCount={null}
      containerClassName="py-2.5 px-4 flex justify-center items-center bg-white rounded-lg shadow-base md:px-0 md:gap-10 xl:self-end"
    />
  );
};
