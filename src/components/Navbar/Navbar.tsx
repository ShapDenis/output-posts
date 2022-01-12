import React, { FC } from "react";
import { HeaderStyles } from "./HeaderStyles";
import { Link } from "react-router-dom";

const Navbar: FC = () => {
  return (
    <>
      <div css={HeaderStyles.HeaderWrap}>
        <nav>
          <ul css={HeaderStyles.HeaderNavLists}>
            <Link css={HeaderStyles.HeaderNavListLink} to="/">
              <li>Post</li>
            </Link>
            <Link css={HeaderStyles.HeaderNavListLink} to="/users">
              <li>Users</li>
            </Link>
            <Link css={HeaderStyles.HeaderNavListLink} to="/albums">
              <li>Albums</li>
            </Link>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
