import React from "react";
import { Link } from "react-router-dom";
import { FaUser, FaStar, FaClock, FaComments } from "react-icons/fa";
import "./postInfo.scss";

function PostInfo({ by, descendants, kids, score, time, id }) {
  return (
    <React.Fragment>
      {by && (
        <Link className="hn-posts__link" to={`/user?id=${by}`}>
          <FaUser className="hn-posts__icon" /> {by}
        </Link>
      )}
      {score && (
        <div className="hn-posts__info">
          <FaStar className="hn-posts__icon" /> {score}
        </div>
      )}
      {time && (
        <div className="hn-posts__info">
          <FaClock className="hn-posts__icon" /> {time}
        </div>
      )}
      {typeof descendants === "number" && descendants !== 0 && (
        <Link className="hn-posts__link" to={`/post?id=${id}`}>
          <FaComments className="hn-posts__icon" /> {descendants}
        </Link>
      )}
    </React.Fragment>
  );
}

export default PostInfo;
