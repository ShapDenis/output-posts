import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "../../store";

type Posts = { userId: string; id: string; title: string; body: string };

export const postsAdapter = createEntityAdapter<Posts>({
  selectId: (posts) => posts.id,
});

const selectState = (state: RootState) => state.posts;
export const { selectAll } = postsAdapter.getSelectors(selectState);

export const getPosts = createAsyncThunk(`/getPosts`, async () => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);
  return await response.json();
});

export const postsSlice = createSlice({
  name: "users",
  initialState: postsAdapter.getInitialState(),
  reducers: {},
  extraReducers: {
    [getPosts.fulfilled.type]: (state, action) => {
      postsAdapter.setAll(state, action.payload);
    },
  },
});

export const posts = postsSlice.reducer;
