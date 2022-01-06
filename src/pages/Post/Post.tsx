import React, { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PostStyles } from "./PostStyles";
import { useDispatch, useSelector } from "react-redux";
import { selectPost } from "../slice/post";
import { getComments } from "../slice/comments";
import { selectAll } from "../slice/comments";
import { PostsStyles } from "../Posts/PostsStyles";

export const Post: FC = () => {
  const [changes, setChanges] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const post = useSelector(selectPost(Number(id)));
  const comments = useSelector(selectAll);

  useEffect(() => {
    if (post) {
      dispatch(getComments(Number(id)));
    }
  }, []);

  const setLocalStorage = (s: any) => {
    console.log(s);
    console.log("changes");
  };

  return (
    <form>
      <div css={PostStyles.PostsWrap}>
        <div css={PostStyles.PostsContent}>
          <button onClick={() => navigate(`/`)}>Cansel</button>
          <button type="submit" onClick={(s) => setLocalStorage(s)}>
            Save
          </button>
          <tbody css={PostStyles.PostsContentTbody}>
            <tr>
              <th css={PostStyles.PostsContentHeader}>User</th>
              <th css={PostStyles.PostsContentHeader}>Title</th>
              <th css={PostStyles.PostsContentHeader}>Body</th>
            </tr>

            <tr>
              <td css={PostStyles.PostsContentTr}>
                <input type="text" defaultValue={post.userId} />
              </td>
              <td css={PostStyles.PostsContentTr}>
                <input type="text" defaultValue={post.title} />
              </td>
              <td css={PostStyles.PostsContentTr}>
                <input type="text" defaultValue={post.body} />
              </td>
            </tr>
          </tbody>
          <div>
            <p>Comments</p>
            <tbody css={PostStyles.PostsContentTbody}>
              <tr>
                <th css={PostStyles.PostsContentHeader}>postId</th>
                <th css={PostStyles.PostsContentHeader}>id</th>
                <th css={PostStyles.PostsContentHeader}>name</th>
                <th css={PostStyles.PostsContentHeader}>email</th>
                <th css={PostStyles.PostsContentHeader}>body</th>
              </tr>
              {comments &&
                comments.map((comment, key) => {
                  return (
                    <tr key={key}>
                      <td css={PostsStyles.PostsContentTr}>
                        <input type="text" defaultValue={comment.postId} />
                      </td>
                      <td css={PostsStyles.PostsContentTr}>
                        <input type="text" defaultValue={comment.id} />
                      </td>
                      <td css={PostsStyles.PostsContentTr}>
                        <input type="text" defaultValue={comment.name} />
                      </td>
                      <td css={PostsStyles.PostsContentTr}>
                        <input type="text" defaultValue={comment.email} />
                      </td>
                      <td css={PostsStyles.PostsContentTr}>
                        <input type="text" defaultValue={comment.body} />
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </div>
        </div>
      </div>
    </form>
  );
};
