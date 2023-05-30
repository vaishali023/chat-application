import React from 'react';
import { useState, useContext } from 'react';
import './Input.styles.scss';
import Image from '../../assets/addimage.png';
import Attach from '../../assets/attachIcon.png';
import { useFirestore } from 'reactfire';
import { db } from '../../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ChatContext } from '../../ChatContext';

const Input = () => {
  const { data: state } = useContext(ChatContext);
  const firestore = useFirestore();
  const messagesRef = collection(firestore, 'messages');
  const [messageText, setMessageText] = useState('');

  const handleInputChange = (event) => {
    setMessageText(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      sendMessage();
    }
  };

  const handleSendMessage = () => {
    sendMessage();
  };

  const sendMessage = async () => {
    if (messageText.trim() === '') {
      return;
    }

    const sender = state.user.displayName;
    const uid = state.user.uid;

    if (!uid) {
      console.error('User UID is undefined.');
      return;
    }

    try {
      await addDoc(messagesRef, {
        content: messageText,
        uid: uid,
        timestamp: serverTimestamp(),
        name: sender,
      });
      setMessageText('');
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <div className='inputContainer'>
      <input
        type='text'
        placeholder='Type a message...'
        value={messageText}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSendMessage} className='sendButton'>Send</button>
    </div>
  );
  };
  
  export default Input;