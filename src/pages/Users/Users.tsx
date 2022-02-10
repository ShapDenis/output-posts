import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, selectUsers, selectUsersCount } from "../../slice/users";
import { Pagination } from "../../components/Pagination";
import { UsersStyles } from "./UsersStyle";
import { usePagination } from "../../hooks/usePagination";

export const Users = () => {
  const dispatch = useDispatch();
  const notesOnPage = 5;
  const usersCount = useSelector(selectUsersCount());
  const users = useSelector(selectUsers());
  const { numberOfPages, setPage, items } = usePagination(
    usersCount,
    users,
    notesOnPage
  );

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <ul>
          {items &&
            items.map((user) => {
              return <li key={user.id}>{user.name}</li>;
            })}
        </ul>
      </div>
      <div css={UsersStyles.UsersContentPagination}>
        {items.length > 0 && Pagination(numberOfPages, setPage)}
      </div>
    </form>
  );
};
