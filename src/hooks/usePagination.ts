import { useEffect, useState } from "react";
import { getItemsByPagination } from "../helpers/getItemsByPagination";

export const usePagination = <T>(
  count: number,
  items: T[],
  countOnPage = 20
) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(0);
  useEffect(() => {
    setNumberOfPages(count / countOnPage);
  }, [countOnPage, count]);

  const setPage = (page: number) => setCurrentPage(page);
  return {
    currentPage,
    numberOfPages,
    countOnPage,
    items: getItemsByPagination(items, countOnPage, currentPage),
    setPage,
  };
};
