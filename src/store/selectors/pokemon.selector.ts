import { PokemonSliceType } from "../slices/pokemons.slice";

export const selectPokemons = (state: { pokemon: PokemonSliceType }) =>
  state.pokemon;

export const selectOffset = (state: { pokemon: PokemonSliceType }) =>
  state.pokemon.offset;

export const selectPokemonFavorites = (state: { pokemon: PokemonSliceType }) =>
  state.pokemon.pokemonsFavorites;
