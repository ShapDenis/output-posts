import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "../store";

type Comments = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

export const commentsAdapter = createEntityAdapter<Comments>({
  selectId: (comments) => comments.id,
});

const selectState = (state: RootState) => state.comments;
export const { selectAll, selectById: selectUserByID } =
  commentsAdapter.getSelectors(selectState);

export const getComments = createAsyncThunk(`/getComments`, async () => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/comments`);
  return await response.json();
});

export const commentsSlice = createSlice({
  name: "comments",
  initialState: commentsAdapter.getInitialState(),
  reducers: {
    commentUpdated: commentsAdapter.updateMany,
    commentDelete: commentsAdapter.removeOne,
    commentAdd: commentsAdapter.addOne,
  },
  extraReducers: {
    [getComments.fulfilled.type]: (state, action) => {
      commentsAdapter.setAll(state, action.payload);
    },
  },
});
export const { commentUpdated, commentDelete, commentAdd } =
  commentsSlice.actions;

export const comments = commentsSlice.reducer;
