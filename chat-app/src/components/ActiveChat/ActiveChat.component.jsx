import React from "react";
import "./ActiveChat.styles.scss";
import { useState, useContext, useEffect, useRef } from "react";
import {
  useFirestoreCollectionData,
  useFirestore,
  useUser,
  useFirestoreDocData,
} from "reactfire";
import {
  collection,
  query,
  orderBy,
  limit,
  doc,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";
import { ChatContext } from "../../ChatContext";

const ActiveChat = () => {
  const { data: state } = useContext(ChatContext);
  const messagesRef = collection(db, "messages");
  const queryRef = query(messagesRef, orderBy("timestamp", "asc"), limit(10));
  const [messages, setMessages] = useState([]);
  const { status, data: messagesData } = useFirestoreCollectionData(queryRef, {
    idField: "id",
  });

  const messagesContainerRef = useRef(null);

  useEffect(() => {
    if (status === "success") {
      setMessages(messagesData);
    

      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
      }
    }
  }, [status, messagesData, state]);

  const formatTimestamp = (timestamp) => {
    const date = timestamp.toDate();
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
    });
    return `${formattedDate} ${formattedTime}`;
  };

  const { data: currentUser } = useUser();

  return (
    <div className="activeChatContainer">
      <div className="chatInfo" ref={messagesContainerRef}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${
              message.uid === currentUser?.uid ? "sent" : "received"
            }`}
          >
            <div className="messageContent">
              <p className="sender">{message.name}</p>
              <div className="messageBubble">
                <p className="content">{message.content}</p>
              </div>
            </div>
            <p className="timestamp">
              {message.timestamp && formatTimestamp(message.timestamp)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveChat;
