import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { FirebaseAppProvider } from 'reactfire';
import App from './App';
import { firebaseConfig } from './firebase'; 


ReactDOM.render(
  <React.StrictMode>
  <FirebaseAppProvider firebaseConfig={firebaseConfig}>
  <BrowserRouter>
        <App />
      </BrowserRouter>
  </FirebaseAppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
