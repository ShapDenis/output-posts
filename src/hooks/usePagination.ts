import { useEffect, useState } from "react";

export const usePagination = (count: number, countOnPage = 20) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(0);

  useEffect(() => {
    setNumberOfPages(count / countOnPage);
  }, [countOnPage, count]);

  const setPage = (page: number) => setCurrentPage(page);
  return { currentPage, numberOfPages, countOnPage, setPage };
};
