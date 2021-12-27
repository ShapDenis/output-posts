import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, selectPosts, selectPostsCount } from "../slice/post";
import { getUsers, selectAll } from "../slice/users";
import { PostsStyles } from "./PostsStyles";

export const Posts: FC = () => {
  const [page, setPage] = useState(1);
  const [authorChange, setAuthorChange] = useState<number>();
  const [searchFields, setSearchFields] = useState<string>();
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts(page, authorChange, searchFields));
  const users = useSelector(selectAll);
  const postsCount = useSelector(selectPostsCount(authorChange));
  const notesOnPage = 7;

  useEffect(() => {
    if (posts.length === 0) {
      dispatch(getUsers());
      dispatch(getPosts());
    }
  }, []);

  const pagination = (posts: any) => {
    const countOfItems = Array.from(
      { length: Math.ceil(postsCount / notesOnPage) },
      () => posts.slice(0, notesOnPage)
    );

    return countOfItems.map((el, index) => (
      <button onClick={() => setPage(index)} key={index}>
        {index + 1}
      </button>
    ));
  };
  return (
    <div css={PostsStyles.PostsWrap}>
      <div css={PostsStyles.PostsContent}>
        <select
          id="selectBox"
          onChange={(event) => {
            setAuthorChange(Number(event.target.value));
            setPage(0);
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
            console.log(event.target.value);
            setSearchFields(event.target.value);
            setPage(0);
          }}
        />
        <tbody css={PostsStyles.PostsContentTbody}>
          <tr>
            <th css={PostsStyles.PostsContentHeader}>User</th>
            <th css={PostsStyles.PostsContentHeader}>Title</th>
            <th css={PostsStyles.PostsContentHeader}>Body</th>
          </tr>
          {posts &&
            posts.length > 0 &&
            posts.map((post, key) => {
              return (
                <>
                  <tr key={key}>
                    <td css={PostsStyles.PostsContentTr}>{post.user.name}</td>
                    <td css={PostsStyles.PostsContentTr}>{post.title}</td>
                    <td css={PostsStyles.PostsContentTr}>{post.body}</td>
                  </tr>
                  <div css={PostsStyles.PostsContentBtn}>
                    <button>edit</button>
                    <button>del</button>
                  </div>
                </>
              );
            })}
        </tbody>
        <div css={PostsStyles.PostsContentPagination}>
          {posts.length > 0 && pagination(posts)}
        </div>
      </div>
    </div>
  );
};
