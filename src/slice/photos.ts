import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "../store";

type Photos = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

export const photosAdapter = createEntityAdapter<Photos>({
  selectId: (photos) => photos.id,
});

const selectState = (state: RootState) => state.photos;
const selectRootState = (state: RootState) => state;

export const selectPhotosCount = (id: number) =>
  createSelector([selectRootState], (state) => {
    const photos = selectAll(state);
    return photos.filter((photo) => photo.albumId === id).length;
  });
export const { selectAll } = photosAdapter.getSelectors(selectState);

export const selectPhotos = (page: number, notesOnPage: number, id: number) =>
  createSelector([selectRootState], (state) => {
    const photos = selectAll(state);
    return photos
      .filter((photo) => photo.albumId === id)
      .slice(notesOnPage * page, notesOnPage * page + notesOnPage)
      .map((el) => {
        return { ...el };
      });
  });

export const getPhotos = createAsyncThunk(`/getPhotos`, async () => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/photos`);
  return await response.json();
});

export const photosSlice = createSlice({
  name: "photos",
  initialState: photosAdapter.getInitialState(),
  reducers: {},
  extraReducers: {
    [getPhotos.fulfilled.type]: (state, action) => {
      photosAdapter.setAll(state, action.payload);
    },
  },
});

export const photos = photosSlice.reducer;
