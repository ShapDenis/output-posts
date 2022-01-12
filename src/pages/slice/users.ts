import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "../../store";

type Users = { id: number; name: string };

export const usersAdapter = createEntityAdapter<Users>({
  selectId: (users) => users.id,
});

const selectState = (state: RootState) => state.users;
const selectRootState = (state: RootState) => state;

export const selectUsersCount = () =>
  createSelector([selectRootState], (state) => {
    const users = selectAll(state);
    return users.length;
  });

export const { selectAll, selectById: selectUserByID } =
  usersAdapter.getSelectors(selectState);

export const selectUsers = (page: number, notesOnPage: number) =>
  createSelector([selectRootState], (state) => {
    const users = selectAll(state);
    return users
      .slice(notesOnPage * page, notesOnPage * page + notesOnPage)
      .map((el) => {
        return { ...el };
      });
  });

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
