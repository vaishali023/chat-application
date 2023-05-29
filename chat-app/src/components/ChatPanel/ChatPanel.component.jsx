import React from 'react';
import './ChatPanel.styles.scss';
import ActiveChat from '../ActiveChat/ActiveChat.component';
import Input from '../Input/Input.component';
import NavBar from '../NavBar/NavBar.component';

const ChatPanel = () => {
  return (
    <div className='chatPanelContainer'>
      <div className='wrapper'>
      <NavBar />
      <ActiveChat />
      <Input/>
      </div>
    </div>
  )
}


