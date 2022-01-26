import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPhotos, selectPhotos, selectPhotosCount } from "../../slice/photos";
import { Pagination } from "../../components/Pagination";
import { PhotosStyles } from "./PhotosStyle";
import { useParams } from "react-router-dom";
import { usePagination } from "../../hooks/usePagination";

export const Photos = () => {
  const { id } = useParams();
  const notesOnPage = 10;
  const dispatch = useDispatch();
  const photosCount = useSelector(selectPhotosCount(Number(id)));
  const { currentPage, numberOfPages, setPage, countOnPage } = usePagination(
    photosCount,
    notesOnPage
  );

  const photos = useSelector(
    selectPhotos(currentPage, countOnPage, Number(id))
  );

  useEffect(() => {
    if (photos.length === 0) {
      dispatch(getPhotos());
    }
  }, []);

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
  };
  return (
    <form onSubmit={handleFormSubmit}>
      <div css={PhotosStyles.PhotosContent}>
        <ul css={PhotosStyles.PhotosImgBlock}>
          {photos &&
            photos.map((photo) => {
              return (
                <figure key={photo.id}>
                  <img
                    src={photo.thumbnailUrl}
                    width="75"
                    height="90"
                    alt={photo.title}
                  />
                  <figcaption>{photo.title}</figcaption>
                </figure>
              );
            })}
        </ul>
      </div>
      <div css={PhotosStyles.PhotosContentPagination}>
        {photos.length > 0 && Pagination(numberOfPages, setPage)}
      </div>
    </form>
  );
};
