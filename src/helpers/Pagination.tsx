import React from "react";

export const Pagination = (
  data: any,
  notesOnPage: number,
  count: number,
  setPage: any
) => {
  const countOfItems = Array.from(
    { length: Math.ceil(count / notesOnPage) },
    () => data.slice(0, notesOnPage)
  );
  return countOfItems.map((el, index) => (
    <button onClick={() => setPage(index)} key={index}>
      {index + 1}
    </button>
  ));
};
