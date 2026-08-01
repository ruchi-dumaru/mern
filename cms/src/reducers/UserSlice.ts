import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { IUserProfile } from "../context/auth.context";
import { getRequest } from "../config/axios.config";

interface IInitialStates {
  allUsers: Array<IUserProfile>;
  activeUser: IUserProfile | null;
}

const initialState: IInitialStates = {
  allUsers: [],
  activeUser: null,
};

type GetAllUsersParams = {
  page?: number;
  limit?: number;
};

export const getAllUsers = createAsyncThunk<
  IUserProfile[],
  GetAllUsersParams | void
>("User/getAllUsers", async (params) => {
  const response = await getRequest("/user", {
    params: {
      page: params?.page ?? 1,
      limit: params?.limit ?? 100,
    },
  });

  const payload: unknown = response;
  if (Array.isArray(payload)) {
    return payload as IUserProfile[];
  }

  if (
    typeof payload === "object" &&
    payload !== null &&
    Array.isArray((payload as { data?: unknown }).data)
  ) {
    return (payload as { data: IUserProfile[] }).data;
  }

  if (
    typeof payload === "object" &&
    payload !== null &&
    Array.isArray((payload as { users?: unknown }).users)
  ) {
    return (payload as { users: IUserProfile[] }).users;
  }

  return [];
});

const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    setActiveUser: (state, action: PayloadAction<IUserProfile | null>) => {
      state.activeUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.allUsers = action.payload;
    });

    builder.addCase(getAllUsers.rejected, (state) => {
      state.allUsers = [];
    });
  },
});

export const { setActiveUser } = userSlice.actions;

export default userSlice.reducer;
