import React from 'react';
import './ActiveChat.styles.scss';
import  { useState, useContext, useEffect } from 'react';
import { useFirestoreCollectionData,useFirestore, useUser } from 'reactfire';
import { db } from '../../firebase';
import { ChatContext } from '../../ChatContext';

const ActiveChat = () => {
  const { data: state, firestore } = useContext(ChatContext);
  
  const messagesRef = firestore.collection('messages');
  const [messages, setMessages] = useState([]);

  const { status, data: messagesData } = useFirestoreCollectionData(
    messagesRef.orderBy('timestamp', 'desc')
  );

  useEffect(() => {
    if (status === 'success') {
      setMessages(messagesData);
      console.log('ChatContext state:', state);

    }
  }, [status, messagesData]);

  return (
    <div className='activeChatContainer'>
      <h2>Active Chat</h2>
      <p>Chat ID: {state.chatId}</p>
      <p>User: {state.user.displayName}</p>

      <div className='messageList'>
        {messages.map((message) => (
          <div key={message.id} className='message'>
            <p>{message.text}</p>
            <p>Sender: {message.sender}</p>
            <p>Timestamp: {message.timestamp.toDate().toString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveChat;
