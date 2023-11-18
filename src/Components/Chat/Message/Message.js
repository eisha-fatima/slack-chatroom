import React from "react";
import "./Message.css";
import Avatar from "@mui/material/Avatar";

const Message = ({ message, timestamp, user, userImage, image }) => {
  return (
    <div className="message">
      {/* <img src={userImage} alt="" /> */}
      <Avatar src={userImage} />
      <div className="message__info">
        <h4>
          {user}{" "}
          <span className="message__timestamp">
            {new Date(timestamp?.toDate()).toUTCString()}
          </span>
        </h4>
        <p>{message}</p>
        {image && <img src={image} className="message__image" alt="" />}
      </div>
    </div>
  );
};

export default Message;
