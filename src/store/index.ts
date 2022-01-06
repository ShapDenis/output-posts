import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { posts } from "../pages/slice/post";
import { users } from "../pages/slice/users";
import { comments } from "../pages/slice/comments";

const rootReducer = combineReducers({ posts, users, comments });
export const store = configureStore({ reducer: rootReducer }); //persistedState

store.subscribe(() => {
  localStorage.setItem("reduxState", JSON.stringify(store.getState()));
});

const persistedState = localStorage.getItem("reduxState")
  ? JSON.parse(localStorage.getItem("reduxState"))
  : {};

export type RootState = ReturnType<typeof store.getState>;
