import React from 'react';
import { useState, useContext } from 'react';
import './Input.styles.scss';
import Image from '../../assets/addimage.png';
import Attach from '../../assets/attachIcon.png';
import { useFirestore } from 'reactfire';
import { db } from '../../firebase';
import { ChatContext } from '../../ChatContext';

const Input = () => {
    const { data: state, firestore } = useContext(ChatContext);
    const messagesRef = firestore.collection('messages');
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
    console.log('ChatContext state:', state);

    const sendMessage = async () => {
      if (messageText.trim() === '') {
        return;
      }
  
      const sender = state.user.displayName; 
      await messagesRef.add({
        text: messageText,
        sender,
        timestamp: new Date(),
      });
  
      setMessageText('');
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
        <button onClick={handleSendMessage}>Send</button>
      </div>
    );
  };
  
  export default Input;