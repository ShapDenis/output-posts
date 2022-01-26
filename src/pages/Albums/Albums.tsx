import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAlbums, selectAlbums, selectAlbumsCount } from "../../slice/albums";
import { Pagination } from "../../components/Pagination";
import { AlbumsStyles } from "./AlbumsStyle";
import { Link } from "react-router-dom";
import { usePagination } from "../../hooks/usePagination";

export const Albums = () => {
  const dispatch = useDispatch();
  const notesOnPage = 15;
  const albumsCount = useSelector(selectAlbumsCount());
  const { currentPage, numberOfPages, setPage, countOnPage } = usePagination(
    albumsCount,
    notesOnPage
  );
  const albums = useSelector(selectAlbums(currentPage, countOnPage));

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
        {albums.length > 0 && Pagination(numberOfPages, setPage)}
      </div>
    </form>
  );
};
