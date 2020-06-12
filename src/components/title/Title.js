import React from "react";
import { Link } from "react-router-dom";
import "./title.scss";

function Title({ title, url, id, urlSite }) {
  return (
    <div className="hn-posts__wrapper">
      {url ? (
        <React.Fragment>
          <a className="hn-posts__title" href={url} target="_blank" rel="noopener noreferrer">
            {title}
          </a>
          <span className="hn-posts__urlsite"> {`(${urlSite})`}</span>
        </React.Fragment>
      ) : (
        <Link className="hn-posts__title" to={`/post?id=${id}`}>{title}</Link>
      )}
    </div>
  );
}

export default Title;
