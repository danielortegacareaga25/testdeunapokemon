import { UserSliceType } from "../slices/user.slice";

export const selectUser = (state: { user: UserSliceType }) => state.user;

export const selectUid = (state: { user: UserSliceType }) => state.user.uid;
