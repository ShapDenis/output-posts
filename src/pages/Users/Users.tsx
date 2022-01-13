import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, selectUsers, selectUsersCount } from "../../slice/users";
import { Pagination } from "../../helpers/Pagination";
import { UsersStyles } from "./UsersStyle";

export const Users = () => {
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();
  const notesOnPage = 5;
  const users = useSelector(selectUsers(page, notesOnPage));
  const count = useSelector(selectUsersCount());

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
          {users &&
            users.map((user) => {
              return <li key={user.id}>{user.name}</li>;
            })}
        </ul>
      </div>
      <div css={UsersStyles.UsersContentPagination}>
        {users.length > 0 && Pagination(users, notesOnPage, count, setPage)}
      </div>
    </form>
  );
};
