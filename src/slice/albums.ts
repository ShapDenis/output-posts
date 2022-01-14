import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "../store";
import { getItemsByPagination } from "../helpers/getItemsByPagination";

type Albums = { id: number; userId: number; title: string };

export const albumsAdapter = createEntityAdapter<Albums>({
  selectId: (albums) => albums.id,
});

const selectState = (state: RootState) => state.albums;
const selectRootState = (state: RootState) => state;

export const selectAlbumsCount = () =>
  createSelector([selectRootState], (state) => {
    const albums = selectAll(state);
    return albums.length;
  });
export const { selectAll } = albumsAdapter.getSelectors(selectState);

export const selectAlbums = (page: number, notesOnPage: number) =>
  createSelector([selectRootState], (state) => {
    const albums = selectAll(state);
    return getItemsByPagination(albums, notesOnPage, page);
  });

export const getAlbums = createAsyncThunk(`/getAlbums`, async () => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/albums`);
  return await response.json();
});

export const albumsSlice = createSlice({
  name: "albums",
  initialState: albumsAdapter.getInitialState(),
  reducers: {},
  extraReducers: {
    [getAlbums.fulfilled.type]: (state, action) => {
      albumsAdapter.setAll(state, action.payload);
    },
  },
});

export const albums = albumsSlice.reducer;
