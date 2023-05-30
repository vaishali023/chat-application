import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
       
      // Sign in the user using Firebase Authentication
      await signInWithEmailAndPassword(auth, email, password);
      // Clear the form fields after successful login
      setEmail('');
      setPassword('');
      setError(null);
  
      // Redirect 
      setTimeout(() => {
        navigate('/');
       
      }, 500);
    } catch (error) {
      // Handle login errors
      setError('Invalid email or password');
    }
  };

  return (
    <div className='formContainer'>
      <div className='wrapper'>
        <h2 className='title'>Welcome to the Chat!</h2>
        <h3>Sign in</h3>
        <form onSubmit={handleSubmit}>
          <input
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type='submit'>Sign in</button>
          {error && <span>{error}</span>}
        </form>
        <p>
          You don't have an account? <Link to='/register'>Register</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
