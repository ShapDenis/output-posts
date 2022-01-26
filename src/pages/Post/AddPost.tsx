import React, { useState } from "react";
import { AddPostStyles } from "./AddPostStyle";
import { useDispatch, useSelector } from "react-redux";
import { selectAll } from "../../slice/users";
import { postAdd } from "../../slice/post";

const AddPost = ({ setShow }: any) => {
  const users = useSelector(selectAll);
  const dispatch = useDispatch();
  const [user, setUser] = useState<number>();
  const [title, setTitle] = useState<string>();
  const [body, setBody] = useState<string>();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(
      postAdd({
        body: body,
        id: Math.random() + 500,
        title: title,
        userId: user,
      })
    );
    setShow(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div css={AddPostStyles.AddPostWrap}>
        <label css={AddPostStyles.AddPostLabel}>
          User
          <select
            css={AddPostStyles.AddPostSelectUser}
            onChange={(value) => setUser(Number(value.target.value))}
            name="user"
            id="selectBox"
          >
            {users.map((user) => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </label>
        <label css={AddPostStyles.AddPostLabel}>
          Title
          <textarea
            onChange={(value) => setTitle(value.target.value)}
            name="title"
            css={AddPostStyles.AddPostTextarea}
          />
        </label>{" "}
        <label css={AddPostStyles.AddPostLabel}>
          Body
          <textarea
            onChange={(value) => setBody(value.target.value)}
            name="body"
            css={AddPostStyles.AddPostTextarea}
          />
        </label>
        <div css={AddPostStyles.AddPostButtonBlock}>
          <button
            onClick={() => {
              return setShow(false);
            }}
          >
            Close
          </button>
          <button type="submit">Save</button>
        </div>
      </div>
    </form>
  );
};

export default AddPost;
