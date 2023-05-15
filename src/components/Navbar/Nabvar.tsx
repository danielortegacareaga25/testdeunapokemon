import React from "react";
import "./Navbar.scss";

import altPokemonLogo from "./../../assets/img/pokemon-logo.png";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../store";
import { useDispatch } from "react-redux";
import { closeSession } from "../../store/slices/user.slice";

export const Nabvar = () => {
  const navigation = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const close = () => {
    dispatch(closeSession());
    navigation("/");
  };
  return (
    <header className="navbar__container">
      <figure className="navbar__logo" onClick={() => navigation("/pokemons")}>
        <img src={altPokemonLogo} alt="" />
      </figure>
      <input className="navbar__menu-btn" type="checkbox" id="menu-btn" />
      <label className="navbar__menu-icon">
        <span className="navbar__menu-navicon"></span>
      </label>
      <ul className="navbar__menu">
        <li onClick={() => navigation("/favorites")}>
          <span>Favoritos</span>
        </li>
        <li onClick={close}>
          <span>Cerrar sesion</span>
        </li>
      </ul>
    </header>
  );
};
