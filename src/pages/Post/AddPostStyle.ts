import { css } from "@emotion/react";

export const AddPostStyles = {
  AddPostWrap: css`
    height: 350px;
    width: 500px;
    background: darkgrey;
    border-radius: 13px;
    padding: 15px;
    display: flex;
    flex-direction: column;
    z-index: 99999;

    top: 30%;
    left: 30%;
    position: fixed;
    overflow-y: auto;
  `,
  AddPostLabel: css`
    margin-bottom: 15px;
  `,
  AddPostSelectUser: css`
    margin-left: 15px;
  `,
  AddPostTextarea: css`
    width: 100%;
    height: 80px;
  `,
  AddPostButtonBlock: css`
    display: flex;
    justify-content: end;
  `,
};
