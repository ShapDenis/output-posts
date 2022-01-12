import { css } from "@emotion/react";

export const AlbumsStyles = {
  AlbumsContentPagination: css`
    margin-top: 20px;
    display: flex;
    justify-content: center;
  `,
  AlbumsContent: css`
    margin: auto;
    width: 800px;
  `,
  AlbumsLi: css`
    list-style-type: none;
    &:hover {
      background-color: darkgrey;
      opacity: 0.5;
      font-size: 20px;
      transition: all 1s;
    }
  `,
};
