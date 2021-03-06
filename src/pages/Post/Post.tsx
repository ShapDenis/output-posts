import React, { FC, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PostStyles } from "./PostStyles";
import { useDispatch, useSelector } from "react-redux";
import { selectPost } from "../../slice/post";
import {
  commentAdd,
  commentDelete,
  commentUpdated,
  getComments,
} from "../../slice/comments";
import { selectAll } from "../../slice/comments";
import { PostsStyles } from "../Posts/PostsStyles";
import { postUpdated } from "../../slice/post";

export const Post: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const post = useSelector(selectPost(Number(id)));
  const comments = useSelector(selectAll);

  useEffect(() => {
    if (post && comments.length === 0) {
      dispatch(getComments());
    }
  }, []);

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    dispatch(
      postUpdated({
        id: formData.get("id").toString(),
        changes: {
          title: formData.get("title").toString(),
          body: formData.get("body").toString(),
        },
      })
    );
    dispatch(
      commentUpdated(
        comments
          .filter((comment) => comment.postId === post.id)
          .map((comment) => {
            return {
              id: comment.id,
              changes: {
                name: formData.get(`${comment.id}.name`).toString(),
                email: formData.get(`${comment.id}.email`).toString(),
                body: formData.get(`${comment.id}.body`).toString(),
              },
            };
          })
      )
    );
    navigate(`/`);
  };
  const deleteComment = (comment: any) => {
    dispatch(commentDelete(comment.id));
  };
  const addComment = () => {
    dispatch(
      commentAdd({
        postId: post.id,
        id: Math.random() + 500,
        name: "",
        email: "",
        body: "",
      })
    );
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div css={PostStyles.PostsWrap}>
        <div css={PostStyles.PostsContent}>
          <button onClick={() => navigate(`/`)}>Cansel</button>
          <button type="submit">Save</button>
          <tbody css={PostStyles.PostsContentTbody}>
            <tr>
              <th css={PostStyles.PostsContentHeader}>User</th>
              <th css={PostStyles.PostsContentHeader}>Post id</th>
              <th css={PostStyles.PostsContentHeader}>Title</th>
              <th css={PostStyles.PostsContentHeader}>Body</th>
            </tr>

            <tr>
              <td css={PostStyles.PostsContentTr}>
                <input type="text" name="userId" readOnly value={post.userId} />
              </td>
              <td css={PostStyles.PostsContentTr}>
                <input type="text" name="id" readOnly value={post.id} />
              </td>
              <td css={PostStyles.PostsContentTr}>
                <input type="text" name="title" defaultValue={post.title} />
              </td>
              <td css={PostStyles.PostsContentTr}>
                <input type="text" name="body" defaultValue={post.body} />
              </td>
            </tr>
          </tbody>

          <p>Comments</p>
          <tbody css={PostStyles.PostsContentTbody}>
            <tr onClick={() => addComment()}>Add commit</tr>
            <tr>
              <th css={PostStyles.PostsContentHeader}>postId</th>
              <th css={PostStyles.PostsContentHeader}>id</th>
              <th css={PostStyles.PostsContentHeader}>name</th>
              <th css={PostStyles.PostsContentHeader}>email</th>
              <th css={PostStyles.PostsContentHeader}>body</th>
            </tr>
            {comments &&
              comments
                .filter((comment) => comment.postId === post.id)
                .map((comment, key) => {
                  return (
                    <tr key={key}>
                      <td css={PostsStyles.PostsContentTr}>
                        <input type="text" readOnly value={comment.postId} />
                      </td>
                      <td css={PostsStyles.PostsContentTr}>
                        <input
                          name={`${comment.id}.id`}
                          type="text"
                          readOnly
                          value={comment.id}
                        />
                      </td>
                      <td css={PostsStyles.PostsContentTr}>
                        <input
                          name={`${comment.id}.name`}
                          type="text"
                          defaultValue={comment.name}
                        />
                      </td>
                      <td css={PostsStyles.PostsContentTr}>
                        <input
                          name={`${comment.id}.email`}
                          type="text"
                          defaultValue={comment.email}
                        />
                      </td>
                      <td css={PostsStyles.PostsContentTr}>
                        <input
                          name={`${comment.id}.body`}
                          type="text"
                          defaultValue={comment.body}
                        />
                      </td>
                      <td onClick={() => deleteComment(comment)}>del</td>
                    </tr>
                  );
                })}
          </tbody>
        </div>
      </div>
    </form>
  );
};
