import React from 'react'
import { FaRedoAlt } from "react-icons/fa";
import './loader.scss';

function Loader({ text = 'Loading'}) {
    return (
        <React.Fragment>
            {text && (
                <div className="hn-loader">{text} <FaRedoAlt className="hn-loader__icon loader"/></div>
            )}
        </React.Fragment>
    )
}

export default Loader;
