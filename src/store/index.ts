import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { posts } from "../slice/post";
import { users } from "../slice/users";
import { comments } from "../slice/comments";
import { albums } from "../slice/albums";
import { photos } from "../slice/photos";

const rootReducer = combineReducers({ posts, users, comments, albums, photos });

const persistedState = localStorage.getItem("reduxState")
  ? JSON.parse(localStorage.getItem("reduxState"))
  : {};

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: persistedState,
});

store.subscribe(() => {
  localStorage.setItem("reduxState", JSON.stringify(store.getState()));
});

export type RootState = ReturnType<typeof store.getState>;
