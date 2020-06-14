import React from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import "./nav.scss";
import ThemeContext from "../../contexts/theme";

const activeStyle = {
  light: {
    borderBottom: '2px solid #f6f6ef'
  },
  dark: {
    borderBottom: '2px solid rgb(203, 203, 203)'
  }
}

function Nav({ toggleTheme }) {
  const theme = React.useContext(ThemeContext);

  return (
    <header className={`hn-header hn-header--${theme}`} style={{ }}>
      <nav className="hn-header__nav">
        <h1 className="hn-header__logo">
          <NavLink
            className={`hn-header__link hn-header__link--${theme} hn-header__link--logo`}
            exact
            to="/"
          >
            Hacker News
          </NavLink>
        </h1>
        <ul className="hn-header__list">
          <li className="hn-header__item">
            <NavLink
              className={`hn-header__link hn-header__link--${theme}`}
              exact
              to="/"
              activeStyle={theme === 'light' ? activeStyle.light : activeStyle.dark}
            >
              best
            </NavLink>
          </li>
          <li className="hn-header__item">
            <NavLink
              className={`hn-header__link hn-header__link--${theme}`}
              to="/ask"
              activeStyle={theme === 'light' ? activeStyle.light : activeStyle.dark}
            >
              ask
            </NavLink>
          </li>
          <li className="hn-header__item">
            <NavLink
              className={`hn-header__link hn-header__link--${theme}`}
              to="/show"
              activeStyle={theme === 'light' ? activeStyle.light : activeStyle.dark}
            >
              show
            </NavLink>
          </li>
          <li className="hn-header__item">
            <NavLink
              className={`hn-header__link hn-header__link--${theme}`}
              to="/job"
              activeStyle={theme === 'light' ? activeStyle.light : activeStyle.dark}
            >
              job
            </NavLink>
          </li>
        </ul>

        <button className="hn-header__btn" onClick={toggleTheme}>
          {theme === "light" ? (
            <FaMoon className={`hn-header__icon hn-header__icon--${theme}`} />
          ) : (
            <FaSun className={`hn-header__icon hn-header__icon--${theme}`} />
          )}
        </button>
      </nav>
    </header>
  );
}

export default Nav;
