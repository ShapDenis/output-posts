import { css } from "@emotion/react";

export const HeaderStyles = {
  HeaderWrap: css`
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(49, 60, 78, 0.8);
    height: 50px;
  `,
  HeaderNavLists: css`
    display: flex;
    width: 100%;
    justify-content: left;
    text-transform: uppercase;
    margin: 0;
    align-items: center;
  `,
  HeaderNavListLink: css`
    margin: 20px;
  `,
};
