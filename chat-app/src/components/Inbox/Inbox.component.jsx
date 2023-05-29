import React from 'react';
import './Inbox.styles.scss';
import NavBar from '../NavBar/NavBar.component';
import Search from '../Search/Search.component';

const Inbox = () => {
  return (
    <div className='inboxContainer'>
      <div className='inboxWrapper'>
        <NavBar />
        <Search />
      </div>
    </div>
  )
}

export default Inbox;