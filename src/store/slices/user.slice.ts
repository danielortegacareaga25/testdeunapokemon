import { PayloadAction, SerializedError, createSlice } from "@reduxjs/toolkit";
import { createUser, loginUser } from "../thunks/user.thunks";

export type UserSliceType = {
  uid: string | null;
  isLoadingCreate: boolean;
  errorCreate: SerializedError | boolean | null | any;
  isLoadingLogin: boolean;
  errorLogin: SerializedError | boolean | null | any;
};

const userInitialState: UserSliceType = {
  uid: null,
  isLoadingCreate: false,
  errorCreate: null,
  isLoadingLogin: false,
  errorLogin: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    setUid: (state, action: PayloadAction<{ uid: string }>) => {
      const { uid } = action.payload;
      localStorage.setItem("userToken", uid || "");
      state.uid = uid;
    },
    closeSession: (state) => {
      localStorage.removeItem("userToken");
      state.uid = null;
    },
  },
  extraReducers(builder) {
    builder.addCase(createUser.pending, (state) => {
      state.isLoadingCreate = true;
    });
    builder.addCase(createUser.rejected, (state, action) => {
      state.isLoadingCreate = false;
      state.errorCreate = action.payload;
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.uid = action.payload.uid;
      state.isLoadingCreate = false;
      state.errorCreate = null;
    });
    builder.addCase(loginUser.pending, (state) => {
      state.isLoadingLogin = true;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoadingLogin = false;
      state.errorLogin = action.payload;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.uid = action.payload.uid;
      state.isLoadingLogin = false;
      state.errorLogin = null;
    });
  },
});

export const { setUid, closeSession } = userSlice.actions;

export default userSlice.reducer;
