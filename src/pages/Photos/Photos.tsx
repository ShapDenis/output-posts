import React, { useEffect, useState } from "react";
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
  const photos = useSelector(selectPhotos(Number(id)));
  const { numberOfPages, setPage } = usePagination(
    photosCount,
    photos,
    notesOnPage
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
                    css={PhotosStyles.PhotosImgBig}
                    src={photo.thumbnailUrl}
                    width="75"
                    height="90"
                    alt={photo.title}
                    onClick={() => console.log(photo.id)}
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
