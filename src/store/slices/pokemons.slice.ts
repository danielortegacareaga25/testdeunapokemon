import { SerializedError, createSlice } from "@reduxjs/toolkit";
import { Pokemon } from "../../interfaces/pokemon.interface";
import {
  addPokemonFavorite,
  deletePokemonFavorite,
  fetchFavorites,
  fetchPokemons,
} from "../thunks/pokemons.thunks";

export type PokemonSliceType = {
  pokemons: Pokemon[];
  pokemonsFavorites: Pokemon[];
  isLoadingPokemons: boolean;
  isLoadingPokemonsFavorites: boolean;
  errorGetPokemons: SerializedError | boolean | null | any;
  errorGetPokemonsFavorites: SerializedError | boolean | null | any;
  isNext: boolean;
  offset: number;
};

const pokemonInitialState: PokemonSliceType = {
  pokemons: [],
  pokemonsFavorites: [],
  isLoadingPokemons: false,
  isLoadingPokemonsFavorites: false,
  errorGetPokemons: null,
  errorGetPokemonsFavorites: null,
  isNext: true,
  offset: 0,
};

export const pokemonSlice = createSlice({
  name: "pokemon",
  initialState: pokemonInitialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchPokemons.fulfilled, (state, action) => {
      state.isLoadingPokemons = false;
      state.errorGetPokemons = null;
      state.pokemons = [...state.pokemons, ...action.payload.results];
      state.isNext = action.payload.next ? true : false;
      state.offset = action.payload.next ? state.offset + 40 : state.offset;
    });
    builder.addCase(addPokemonFavorite.pending, (state) => {
      state.isLoadingPokemonsFavorites = true;
    });
    builder.addCase(addPokemonFavorite.rejected, (state, action) => {
      state.isLoadingPokemonsFavorites = false;
      state.errorGetPokemonsFavorites = action.payload;
    });
    builder.addCase(addPokemonFavorite.fulfilled, (state, action) => {
      state.isLoadingPokemonsFavorites = false;
      state.errorGetPokemonsFavorites = null;
      state.pokemonsFavorites = [...state.pokemonsFavorites, action.payload];
    });
    builder.addCase(fetchFavorites.pending, (state) => {
      state.isLoadingPokemonsFavorites = true;
    });
    builder.addCase(fetchFavorites.rejected, (state, action) => {
      state.isLoadingPokemonsFavorites = false;
      state.errorGetPokemonsFavorites = action.payload;
    });
    builder.addCase(fetchFavorites.fulfilled, (state, action) => {
      state.isLoadingPokemonsFavorites = false;
      state.errorGetPokemonsFavorites = null;
      state.pokemonsFavorites = [...action.payload].sort(
        (a, b) => Number(a.id || "0") - Number(b.id || "0")
      );
    });
    builder.addCase(deletePokemonFavorite.fulfilled, (state, action) => {
      state.pokemonsFavorites = state.pokemonsFavorites.filter(
        (pokemon) => pokemon.docId !== action.payload
      );
    });
  },
});

export default pokemonSlice.reducer;
