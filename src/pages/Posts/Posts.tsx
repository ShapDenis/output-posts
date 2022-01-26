import React, { FC, Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPosts,
  postAdd,
  postDelete,
  selectPosts,
  selectPostsCount,
} from "../../slice/post";
import { getUsers, selectAll } from "../../slice/users";
import { PostsStyles } from "./PostsStyles";
import { Link } from "react-router-dom";
import { Pagination } from "../../components/Pagination";
import { usePagination } from "../../hooks/usePagination";

export const Posts: FC = () => {
  const [authorChange, setAuthorChange] = useState<number>();
  const [searchFields, setSearchFields] = useState<string>();
  const dispatch = useDispatch();

  const users = useSelector(selectAll);
  const notesOnPage = 7;
  const postsCount = useSelector(selectPostsCount(authorChange));

  const { currentPage, numberOfPages, setPage, countOnPage } = usePagination(
    postsCount,
    notesOnPage
  );

  const posts = useSelector(
    selectPosts(currentPage, authorChange, searchFields, countOnPage)
  );

  useEffect(() => {
    if (posts.length === 0) {
      dispatch(getUsers());
      dispatch(getPosts());
    }
  }, []);

  const deletePost = (comment: any) => {
    dispatch(postDelete(comment.id));
  };

  const addPost = () => {
    dispatch(
      postAdd({
        body: "",
        id: Math.random() + 500,
        title: "",
        userId: 2,
      })
    );
  };

  return (
    <div css={PostsStyles.PostsWrap}>
      <div css={PostsStyles.PostsContent}>
        <select
          id="selectBox"
          onChange={(event) => {
            setAuthorChange(Number(event.target.value));
          }}
        >
          {users.map((user) => (
            <option value={user.id} key={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          onChange={(event) => {
            setSearchFields(event.target.value);
          }}
        />
        <button onClick={() => addPost()}>add Post</button>
        <tbody css={PostsStyles.PostsContentTbody}>
          <tr>
            <th css={PostsStyles.PostsContentHeader}>User</th>
            <th css={PostsStyles.PostsContentHeader}>Title</th>
            <th css={PostsStyles.PostsContentHeader}>Body</th>
          </tr>
          {posts &&
            posts.length >= 0 &&
            posts.map((post) => {
              return (
                <Fragment key={post.id}>
                  <tr>
                    <td css={PostsStyles.PostsContentTr}>{post.user.name}</td>
                    <td css={PostsStyles.PostsContentTr}>{post.title}</td>
                    <td css={PostsStyles.PostsContentTr}>{post.body}</td>
                  </tr>
                  <tr css={PostsStyles.PostsContentBtn}>
                    <Link to={`/post/${post.id}`}>
                      <button>edit</button>
                    </Link>
                    <button onClick={() => deletePost(post)}>del</button>
                  </tr>
                </Fragment>
              );
            })}
        </tbody>
        <div css={PostsStyles.PostsContentPagination}>
          {posts.length > 0 && Pagination(numberOfPages, setPage)}
        </div>
      </div>
    </div>
  );
};
