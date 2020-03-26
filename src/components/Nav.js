import React from "react";
import { NavLink } from "react-router-dom";
import { ThemeConsumer } from "../contexts/theme";
import { FaMoon, FaSun } from "react-icons/fa";

const activeStyle = {
  color: "rgb(187, 46, 31)"
};

export default function Nav() {
  return (
    <ThemeConsumer>
      {({ theme, toggleTheme }) => (
        <nav className="nav">
          <ul className="nav__list">
            <li className="nav__item">
              <NavLink
                to="/"
                exact
                className={`nav__link nav__link-${theme} `}
                activeStyle={activeStyle}>
                Top
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink
                to="/new"
                exact
                className={`nav__link nav__link-${theme} `}
                activeStyle={activeStyle}>
                New
              </NavLink>
            </li>
          </ul>
          <button className="btn-switch-mode" onClick={toggleTheme}>
            {theme === "light" ? (
              <FaSun color="rgb(255,215,0)" size={22} />
            ) : (
              <FaMoon color="#eee" size={22} />
            )}
          </button>
        </nav>
      )}
    </ThemeConsumer>
  );
}
