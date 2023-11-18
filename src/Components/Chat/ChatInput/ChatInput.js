import React, { useState } from "react";
import "./ChatInput.css";
import Button from "@mui/material/Button";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, storage } from "../../../firebase";
import { useSelector } from "react-redux";
import { selectuser } from "../../../features/userSlice";
import { getDownloadURL, uploadBytes, ref } from "firebase/storage";

const ChatInput = ({ channelName, channelId }) => {
  const user = useSelector(selectuser);
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);

  // const sendMessage = (e) => {
  //   e.preventDefault();
  //   const channelRef = collection(db, "rooms", channelId, "messages");
  //   addDoc(channelRef, {
  //     message: message,
  //     user: user.username,
  //     userimage: user.userImage,
  //     timestamp: serverTimestamp(),
  //   });
  // };

  const sendPost = (e) => {
    e.preventDefault();
    if (image) {
      const storageRef = ref(storage, `posts/${image.name}`);
      uploadBytes(storageRef, image).then(() => {
        getDownloadURL(storageRef).then((url) => {
          const channelRef = collection(db, "rooms", channelId, "messages");
          addDoc(channelRef, {
            message: message,
            user: user.username,
            userimage: user.userImage,
            timestamp: serverTimestamp(),
            imageUrl: url,
          });
        });
      });
      setMessage("");
      setImage(null);
    } else {
      const channelRef = collection(db, "rooms", channelId, "messages");
      addDoc(channelRef, {
        message: message,
        user: user.username,
        userimage: user.userImage,
        timestamp: serverTimestamp(),
      });
    }
  };

  return (
    <div className="chatInput">
      <form>
        <div className="chatInput__form">
          <div>
            <input
              placeholder="Type Message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          </div>
          <div>
            <Button type="submit" onClick={sendPost}>
              SEND
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChatInput;
