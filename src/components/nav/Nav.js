import React from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import './nav.scss';

function Nav() {
  return (
    <header className="hn-header">
      <nav className="hn-header__nav">
        <h1 className="hn-header__logo">
          <NavLink className="hn-header__link hn-header__link--logo" to="/">Hacker News</NavLink>
        </h1>
        <ul className="hn-header__list">
          <li className="hn-header__item">
            <NavLink className="hn-header__link" to="/ask">ask</NavLink>
          </li>
          <li className="hn-header__item">
            <NavLink className="hn-header__link" to="/show">show</NavLink>
          </li>
          <li className="hn-header__item">
            <NavLink className="hn-header__link" to="/job">job</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Nav;
