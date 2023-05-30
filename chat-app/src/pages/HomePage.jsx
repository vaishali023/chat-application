import React from 'react';
import NavBar from '../components/NavBar/NavBar.component'
import ActiveChat from '../components/ActiveChat/ActiveChat.component';
import Input from '../components/Input/Input.component';

const HomePage = () => {
    console.log('homepage');
  return (
    <div className='hero'>
      <div className='container'>
      <NavBar />
      <ActiveChat />
      <Input/>
      </div>
    </div>
  )
}

export default HomePage;
