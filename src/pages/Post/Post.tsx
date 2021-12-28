import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { PostStyles } from "./PostStyles";

export const Post: FC = (item) => {
  const navigate = useNavigate();
  return (
    <div css={PostStyles.PostsWrap}>
      <div css={PostStyles.PostsContent}>
        <button onClick={() => navigate(`/`)}>Cansel</button>
        <button onClick={() => navigate(`/`)}>Save</button>
        <tbody css={PostStyles.PostsContentTbody}>
          <tr>
            <th css={PostStyles.PostsContentHeader}>User</th>
            <th css={PostStyles.PostsContentHeader}>Title</th>
            <th css={PostStyles.PostsContentHeader}>Body</th>
          </tr>

          <tr>
            <td css={PostStyles.PostsContentTr}>
              <input type="text" />
            </td>
            <td css={PostStyles.PostsContentTr}>
              <input type="text" />
            </td>
            <td css={PostStyles.PostsContentTr}>
              <input type="text" />
            </td>
          </tr>
        </tbody>
      </div>
    </div>
  );
};
