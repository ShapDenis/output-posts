import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAlbums, selectAlbums, selectAlbumsCount } from "../../slice/albums";
import { Pagination } from "../../components/Pagination";
import { AlbumsStyles } from "./AlbumsStyle";
import { Link } from "react-router-dom";

export const Albums = () => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const notesOnPage = 15;
  const albums = useSelector(selectAlbums(page, notesOnPage));
  const numberOfButtons = useSelector(selectAlbumsCount()) / notesOnPage;
  useEffect(() => {
    if (albums.length === 0) {
      dispatch(getAlbums());
    }
  }, []);

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div css={AlbumsStyles.AlbumsContent}>
        <ul>
          {albums &&
            albums.map((album) => {
              return (
                <Link to={`/albums/photos/${album.id}`} key={album.id}>
                  <li css={AlbumsStyles.AlbumsLi} key={album.id}>
                    {album.title}
                  </li>
                </Link>
              );
            })}
        </ul>
      </div>

      <div css={AlbumsStyles.AlbumsContentPagination}>
        {albums.length > 0 && Pagination(numberOfButtons, setPage)}
      </div>
    </form>
  );
};