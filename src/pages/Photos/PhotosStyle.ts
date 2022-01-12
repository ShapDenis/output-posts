import { css } from "@emotion/react";

export const PhotosStyles = {
  PhotosContentPagination: css`
    margin-top: 20px;
    display: flex;
    justify-content: center;
  `,
  PhotosContent: css`
    margin: auto;
    width: 800px;
  `,
  PhotosLi: css`
    list-style-type: none;
    &:hover {
      background-color: darkgrey;
      opacity: 0.5;
      font-size: 20px;
      transition: all 1s;
    }
  `,
  PhotosImgBlock: css`
    display: grid;
    grid-template-columns: 150px 150px 150px 150px 150px;
    text-align: center;
  `,
};
