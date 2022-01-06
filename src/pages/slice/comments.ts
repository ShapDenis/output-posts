import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { usersAdapter } from "./users";

type Comments = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

export const postsAdapter = createEntityAdapter<Comments>({
  selectId: (comments) => comments.id,
});

const selectState = (state: RootState) => state.comments;
export const { selectAll, selectById: selectUserByID } =
  postsAdapter.getSelectors(selectState);

export const getComments = createAsyncThunk(
  `/getComments`,
  async (id: number) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}/comments`
    );
    return await response.json();
  }
);

export const commentsSlice = createSlice({
  name: "comments",
  initialState: postsAdapter.getInitialState(),
  reducers: {},
  extraReducers: {
    [getComments.fulfilled.type]: (state, action) => {
      postsAdapter.setAll(state, action.payload);
    },
  },
});

export const comments = commentsSlice.reducer;
