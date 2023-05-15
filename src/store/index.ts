import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/user.slice";
import pokemonSlice from "./slices/pokemons.slice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    pokemon: pokemonSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
