import { useEffect, useRef } from "react";
import { PokemonCard } from "../../components";
import { AppDispatch } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { fetchPokemons } from "../../store/thunks/pokemons.thunks";
import { selectPokemons } from "../../store/selectors/pokemon.selector";
import "./PokemonList.scss";
import { PagesScreen } from "../../templates/PagesScreen/PagesScreen";

export const PokemonList = () => {
  const dispatch: AppDispatch = useDispatch();
  const { isLoadingPokemons, pokemons, isNext } = useSelector(selectPokemons);
  const div = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const maxToRender = div?.current?.["scrollHeight"] || 100000;
      const sizeInScreen = window.innerHeight + window.scrollY;
      if (sizeInScreen > maxToRender) {
        renderMoreItem();
      }
    };
    window.removeEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    renderMoreItem();
  }, []);

  const renderMoreItem = () => {
    if (!isLoadingPokemons && isNext) {
      dispatch(fetchPokemons(pokemons.length));
    }
  };

  return (
    <PagesScreen>
      <>
        {isLoadingPokemons ? (
          <h1>cargando....</h1>
        ) : (
          <div className="pokemons__container" ref={div}>
            {pokemons.map((pokemon, idx) => (
              <PokemonCard key={idx} pokemon={pokemon} />
            ))}
          </div>
        )}
      </>
    </PagesScreen>
  );
};
