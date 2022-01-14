import React from "react";
//onClick на кнопку
export const Pagination = (numberOfButtons: number, setPage: any) => {
  const countOfItems = Array.from({ length: Math.ceil(numberOfButtons) });
  return countOfItems.map((el, index) => (
    <button onClick={() => setPage(index + 1)} key={index}>
      {index + 1}
    </button>
  ));
};

//кастомный хук реализация переключене страниц
// возвращает текущая страница, количество страниц, выбор страницы(ф-ция выбранной страницы)
