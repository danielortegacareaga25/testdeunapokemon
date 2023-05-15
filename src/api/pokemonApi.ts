import axios from "axios";
import { BASE_URL_POKEMON } from "../consts/api.const";

const pokemonApi = axios.create({
  baseURL: BASE_URL_POKEMON,
});

export default pokemonApi;
