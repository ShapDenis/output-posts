import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "../../store";

type Users = { id: string; name: string };

export const usersAdapter = createEntityAdapter<Users>({
  selectId: (posts) => posts.id,
});

const selectState = (state: RootState) => state.users;
export const { selectAll } = usersAdapter.getSelectors(selectState);

export const getUsers = createAsyncThunk(`/getUsers`, async () => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
  return await response.json();
});

export const usersSlice = createSlice({
  name: "users",
  initialState: usersAdapter.getInitialState(),
  reducers: {},
  extraReducers: {
    [getUsers.fulfilled.type]: (state, action) => {
      usersAdapter.setAll(state, action.payload);
    },
  },
});

export const users = usersSlice.reducer;
