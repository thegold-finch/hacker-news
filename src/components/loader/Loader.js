import React from "react";
import { FaRedoAlt } from "react-icons/fa";
import "./loader.scss";
import ThemeContext from "../../contexts/theme";

function Loader({ text = "Loading" }) {
  const theme = React.useContext(ThemeContext);
  return (
    <React.Fragment>
      {text && (
        <div className={`hn-loader hn-loader--${theme}`}>
          {text} <FaRedoAlt className={`hn-loader__icon hn-loader__icon--${theme} `} />
        </div>
      )}
    </React.Fragment>
  );
}

export default Loader;
