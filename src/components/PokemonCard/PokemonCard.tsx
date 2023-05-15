import { FC, useEffect, useState } from "react";
import "./PokemonCard.scss";
import altImg from "./../../assets/img/whoIs.png";
import { BACKGROUND_TYPES } from "../../consts/bg.const";
import pokemonApi from "../../api/pokemonApi";
import {
  Details,
  Pokemon,
  Stat,
  Type,
} from "../../interfaces/pokemon.interface";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import {
  addPokemonFavorite,
  deletePokemonFavorite,
} from "../../store/thunks/pokemons.thunks";
import { selectUid } from "../../store/selectors/user.selector";
import { selectPokemonFavorites } from "../../store/selectors/pokemon.selector";

interface PokemonCardProps {
  pokemon: Pokemon;
}

export const PokemonCard: FC<PokemonCardProps> = ({
  pokemon: { url, name, id, docId },
}) => {
  const dispatch: AppDispatch = useDispatch();
  const userId = useSelector(selectUid);
  const pokemonFavorites = useSelector(selectPokemonFavorites);
  const [defaultImg, setDefaultImage] = useState(altImg);
  const [isFavorite, setIsFavorite] = useState(false);
  const [hp, setHp] = useState(0);
  const [attack, setAttack] = useState(0);
  const [defense, setDefense] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [types, setTypes] = useState<Type[]>([]);
  const [bgType, setBgType] = useState(`url("${BACKGROUND_TYPES[0].url}")`);

  useEffect(() => {
    if (url) {
      setDefaultImage(
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`
      );
      getData();
      findFavorite();
    }
  }, [url]);

  const getData = async () => {
    await pokemonApi
      .get<Details>(`/pokemon/${name}`)
      .then((res) => {
        loadStats(res.data?.stats);
        setTypes(res.data.types);
      })
      .catch(() => {});
  };

  const loadStats = (stats: Stat[]) => {
    stats.forEach((stat) => {
      let statName = stat.stat?.name;
      switch (statName) {
        case "hp":
          setHp(stat.base_stat);
        case "attack":
          setAttack(stat.base_stat);
        case "defense":
          setDefense(stat.base_stat);
        case "speed":
          setSpeed(stat.base_stat);
        default:
          return;
      }
    });
  };
  useEffect(() => {
    if (types.length) {
      const bgType = BACKGROUND_TYPES.find(
        (bgType) => bgType.name === types[0].type.name
      );
      if (bgType) {
        setBgType(`url("${bgType.url}")`);
      }
    }
  }, [types]);

  const addFavorite = () => {
    if (isFavorite && docId) {
      dispatch(deletePokemonFavorite({ idPokemonDoc: docId }));
    } else {
      dispatch(
        addPokemonFavorite({
          pokemon: {
            name,
            id,
            url,
          },
          uid: userId || "",
        })
      );
    }
    setIsFavorite(!isFavorite);
  };

  const findFavorite = () => {
    setIsFavorite(pokemonFavorites.some((pokemon) => pokemon.id === id));
  };

  return (
    <div className="pokemon__card" style={{ backgroundImage: bgType }}>
      <h3 className="pokemon__name">{name}</h3>
      <figure className="pokemon__sprite">
        <img src={defaultImg} alt={`${name}-sprite`} />
      </figure>
      <div className="pokemon__data-container">
        <ul className="pokemon__data">
          <li className="pokemon__data-bar">
            <label htmlFor="hp">Hp</label>
            <progress id="hp" max="255" value={hp}>
              {hp}
            </progress>
            <span>{hp}</span>
          </li>
          <li className="pokemon__data-bar">
            <label htmlFor="attack">Attack</label>
            <progress id="attack" max="255" value={attack}>
              {attack}
            </progress>
            <span>{attack}</span>
          </li>
          <li className="pokemon__data-bar">
            <label htmlFor="defense">Defense</label>
            <progress id="defense" max="255" value={defense}>
              {defense}
            </progress>
            <span>{defense}</span>
          </li>
          <li className="pokemon__data-bar">
            <label htmlFor="speed">Speed</label>
            <progress id="speed" max="255" value={speed}>
              {speed}
            </progress>
            <span>{speed}</span>
          </li>
          <button onClick={addFavorite} className="pokemon__data-fav">
            {isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
          </button>
        </ul>
      </div>
    </div>
  );
};
