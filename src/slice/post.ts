import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "../store";
import { selectUserByID } from "./users";
import { getItemsByPagination } from "../helpers/getItemsByPagination";

type Post = { userId: number; id: number; title: string; body: string };

export const postsAdapter = createEntityAdapter<Post>({
  selectId: (posts) => posts.id,
});

const selectState = (state: RootState) => state.posts;
const selectRootState = (state: RootState) => state;

export const selectPostsCount = (authorId: number, searchFields: string) =>
  createSelector([selectRootState], (state) => {
    const posts = selectAll(state);
    if (authorId) {
      return posts.filter((e) => {
        return e.userId === authorId;
      }).length;
    }
    if (searchFields) {
      return posts.filter((e) => {
        return e.body?.includes(searchFields);
      }).length;
    }
    return posts.length;
  });

export const selectPosts = (authorId: number, searchFields: string) =>
  createSelector([selectRootState], (state) => {
    const posts = selectAll(state);

    const filterPostsSearchFields = posts.filter((e) => {
      return e.body?.includes(searchFields);
    });
    const filterPostsAuthorId = posts.filter((e) => {
      return e.userId === authorId;
    });
    if (searchFields) {
      return filterPostsSearchFields.map((el) => {
        const user = selectUserByID(state, el.userId);
        return { ...el, user: user };
      });
    }
    if (authorId) {
      return filterPostsAuthorId.map((el) => {
        const user = selectUserByID(state, el.userId);
        return { ...el, user: user };
      });
    }

    return posts.map((el) => {
      const user = selectUserByID(state, el.userId);
      return { ...el, user: user };
    });
  });

export const selectPost = (id: number) =>
  createSelector([selectRootState], (state) => {
    return selectAll(state).filter((e) => e.id === id)[0];
  });

export const { selectAll } = postsAdapter.getSelectors(selectState);

export const getPosts = createAsyncThunk(`/getPosts`, async () => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);
  return await response.json();
});

export const postsSlice = createSlice({
  name: "posts",
  initialState: postsAdapter.getInitialState(),
  reducers: {
    postUpdated: postsAdapter.updateOne,
    postDelete: postsAdapter.removeOne,
    postAdd: postsAdapter.addOne,
  },
  extraReducers: {
    [getPosts.fulfilled.type]: (state, action) => {
      postsAdapter.setAll(state, action.payload);
    },
  },
});
export const { postUpdated, postDelete, postAdd } = postsSlice.actions;

export const posts = postsSlice.reducer;
