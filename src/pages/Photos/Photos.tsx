import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPhotos, selectPhotos, selectPhotosCount } from "../../slice/photos";
import { Pagination } from "../../helpers/Pagination";
import { PhotosStyles } from "./PhotosStyle";
import { useParams } from "react-router-dom";

export const Photos = () => {
  const { id } = useParams();
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();
  const notesOnPage = 20;
  const photos = useSelector(selectPhotos(page, notesOnPage, Number(id)));
  const count = useSelector(selectPhotosCount(Number(id)));

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
        {photos.length > 0 && Pagination(photos, notesOnPage, count, setPage)}
      </div>
    </form>
  );
};
