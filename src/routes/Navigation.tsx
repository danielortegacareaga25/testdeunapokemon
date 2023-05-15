import { Route, Routes } from "react-router-dom";
import { Favorites, Login, PokemonList, SignUp } from "../pages";
import ProtectedRoutes from "./ProtectedRoutes/ProtectedRoutes";

export const Navigation = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="sigunp" element={<SignUp />} />
      <Route element={<ProtectedRoutes />}>
        <Route path="/pokemons" element={<PokemonList />} />
        <Route path="/favorites" element={<Favorites />} />
      </Route>
    </Routes>
  );
};
