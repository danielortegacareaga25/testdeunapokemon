import "./Favorites.scss";
import { PagesScreen } from "../../templates/PagesScreen/PagesScreen";
import { AppDispatch } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchFavorites } from "../../store/thunks/pokemons.thunks";
import { selectUid } from "../../store/selectors/user.selector";
import { selectPokemons } from "../../store/selectors/pokemon.selector";
import { PokemonCard } from "../../components";

export const Favorites = () => {
  const dispatch: AppDispatch = useDispatch();
  const userId = useSelector(selectUid);
  const { isLoadingPokemonsFavorites, pokemonsFavorites } =
    useSelector(selectPokemons);
  useEffect(() => {
    dispatch(fetchFavorites({ uid: userId || "" }));
  }, []);

  return (
    <PagesScreen>
      <>
        {isLoadingPokemonsFavorites ? (
          <h1>cargando....</h1>
        ) : (
          <div className="favorites__container">
            {pokemonsFavorites.map((pokemon) => (
              <PokemonCard
                key={pokemon.docId || pokemon.id}
                pokemon={pokemon}
              />
            ))}
          </div>
        )}
      </>
    </PagesScreen>
  );
};
