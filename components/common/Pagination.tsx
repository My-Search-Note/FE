import { useState } from "react";

type PaginationProps = {
  page_count: number;
};

const Pagination = ({ page_count }: PaginationProps): JSX.Element => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const renderPagination = (): JSX.Element => {
    const pagination = [];
    for (let i = 1; i <= page_count; i++) {
      pagination.push(
        <li key={i}>
          <button
            onClick={() => handlePageClick(i)}
            className={
              "relative block rounded bg-transparent py-1.5 px-3 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white" +
              (currentPage === i ? " font-bold" : "")
            }
          >
            {i}
          </button>
        </li>
      );
    }
    return (
      <nav>
        <ul className="list-style-none flex">
          <li>
            <button
              className="relative block rounded bg-transparent py-1.5 px-3 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
              onClick={() => handlePageClick(currentPage - 1)}
              disabled={currentPage === 1}
            >
              &laquo;
            </button>
          </li>
          {pagination}
          <li>
            <button
              className="relative block rounded bg-transparent py-1.5 px-3 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
              onClick={() => handlePageClick(currentPage + 1)}
              disabled={currentPage === page_count}
            >
              &raquo;
            </button>
          </li>
        </ul>
      </nav>
    );
  };
  return renderPagination();
};

export default Pagination;
