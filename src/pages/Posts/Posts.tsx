import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, selectAll } from "../slice/post";
import { getUsers, selectAll as selectAllUsers } from "../slice/users";
import { PostsStyles } from "./PostsStyles";

const Posts: FC = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectAll);
  const users = useSelector(selectAllUsers);

  useEffect(() => {
    if (posts.length === 0) {
      dispatch(getUsers());
      dispatch(getPosts());
    }
  }, []);

  const userNamePost = (idPost: string) => {
    return users && users.find((e) => e.id === idPost).name;
  };

  return (
    <div css={PostsStyles.PostsWrap}>
      <div css={PostsStyles.PostsContent}>
        <tbody>
          <tr>
            <th css={PostsStyles.PostsContentHeader}>User</th>
            <th css={PostsStyles.PostsContentHeader}>Title</th>
            <th css={PostsStyles.PostsContentHeader}>Body</th>
          </tr>
          {posts &&
            posts.length > 0 &&
            posts.map((post, key) => {
              return (
                <tr key={key}>
                  <td css={PostsStyles.PostsContentTr}>
                    {userNamePost(post.userId)}
                  </td>
                  <td css={PostsStyles.PostsContentTr}>{post.title}</td>
                  <td css={PostsStyles.PostsContentTr}>{post.body}</td>
                </tr>
              );
            })}
        </tbody>
      </div>
    </div>
  );
};

export default Posts;
