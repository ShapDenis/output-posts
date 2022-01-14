export const getItemsByPagination = <T>(
  items: T[], // все items
  perPage: number, // количество на странице
  currentPage: number // текущая страница currentPage
) => {
  const startItem = (currentPage - 1) * perPage;
  const lastItem = currentPage * perPage;
  return items.slice(startItem, lastItem);
};
