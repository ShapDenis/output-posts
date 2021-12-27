import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { posts } from "../pages/slice/post";
import { users } from "../pages/slice/users";

const rootReducer = combineReducers({ posts, users });
export const store = configureStore({ reducer: rootReducer });

export type RootState = ReturnType<typeof store.getState>;
