import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase";

export const createUser = createAsyncThunk<
  User,
  { email: string; password: string }
>(
  "user/create",
  async (userBody: { email: string; password: string }, thunkAPI) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userBody.email,
        userBody.password
      );
      const { user } = userCredential;
      return user;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk<
  User,
  { email: string; password: string }
>(
  "user/login",
  async (userBody: { email: string; password: string }, thunkAPI) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        userBody.email,
        userBody.password
      );
      const { user } = userCredential;
      return user;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
