import React from 'react';
import { useContext } from 'react';
import './NavBar.styles.scss';
import { useAuth } from 'reactfire';
import { auth } from '../../firebase';
import { ChatContext } from '../../ChatContext';

const NavBar = () => {
  const { data: user } = useAuth();

  const handleLogout = async () => {
    await auth.signOut();
    // Perform any additional logout actions or redirect the user
  };

  return (
    <div className='navBarContainer'>
      <div className='user-info'>
        {user && user.photoURL && <img src={user.photoURL} alt='User' />}
        {user && user.displayName && <p>Welcome, {user.displayName}!</p>}
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default NavBar;
