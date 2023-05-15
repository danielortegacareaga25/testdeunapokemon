import { createAsyncThunk } from "@reduxjs/toolkit";
import { Pokemon, PokemonResponse } from "../../interfaces/pokemon.interface";
import pokemonApi from "../../api/pokemonApi";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";

export const fetchPokemons = createAsyncThunk<PokemonResponse, number>(
  "pokemons/fetchData",
  async (n: number, thunkAPI) => {
    try {
      const response = await pokemonApi.get<PokemonResponse>(
        `/pokemon?limit=40&offset=${n}`
      );
      return {
        ...response.data,
        results: response.data.results.map((pokemon) => {
          const splittet = pokemon.url.split("/");
          const id = splittet[splittet.length - 2];
          return { ...pokemon, id };
        }),
      };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchFavorites = createAsyncThunk<Pokemon[], { uid: string }>(
  "pokemons/fetchFavorites",
  async ({ uid }, thunkAPI) => {
    try {
      const q = query(collection(db, "pokemons"), where("user", "==", uid));
      const querySnapshot = await getDocs(q);
      const pokemons: Pokemon[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data() as any;
        delete data["timestamp"];
        pokemons.push({ ...data, docId: doc.id });
      });
      return pokemons;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addPokemonFavorite = createAsyncThunk<
  Pokemon,
  { pokemon: Pokemon; uid: string }
>("pokemons/addFavorite", async ({ pokemon, uid }, thunkAPI) => {
  try {
    addDoc(collection(db, `pokemons`), {
      name: pokemon.name,
      id: pokemon.id,
      url: pokemon.url,
      timestamp: serverTimestamp(),
      user: uid,
    });
    return {
      ...pokemon,
    };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const deletePokemonFavorite = createAsyncThunk<
  string,
  { idPokemonDoc: string }
>("pokemons/deleteFavorite", async ({ idPokemonDoc }, thunkAPI) => {
  try {
    await deleteDoc(doc(db, "pokemons", idPokemonDoc));
    return idPokemonDoc;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
