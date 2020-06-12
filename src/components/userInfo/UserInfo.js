import React from "react";
import { FaStar, FaClock,FaAddressCard } from "react-icons/fa";
import './userInfo.scss';

function UserInfo({ user }) {
  const { about, created, id, karma } = user;
  return (
    <div className="hn-user">
      {id && (
        <h2 className="hn-user__info hn-user__info--id ">
          {id}
        </h2>
      )}
      {karma && (
        <div className="hn-user__info">
          <FaStar className="hn-user__icon" /> {karma}
        </div>
      )}
      {created && (
        <div className="hn-user__info">
          <FaClock className="hn-user__icon" /> {created}
        </div>
      )}
      {about && (
        <div className="hn-user__info">
          <FaAddressCard className="hn-user__icon" />
          <span dangerouslySetInnerHTML={{ __html: about }} />
        </div>
      )}
    </div>
  );
}

export default UserInfo;
