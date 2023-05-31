import './styles.scss';
import Register from './pages/Register';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import { AuthProvider, FirestoreProvider, useAuth } from 'reactfire';
import { auth, db } from './firebase';
import { Routes, Route, Navigate } from 'react-router-dom';
import AppAuthWrapper from './AppAuthWrapper';
import { ChatContextProvider } from './ChatContext';


function App() {
  return (
    <AuthProvider sdk={auth}>
      <FirestoreProvider sdk={db}>
        <ChatContextProvider>
          <Routes>
            <Route
              path="/"
              element={<Navigate to="/home" replace />} // Redirect to /home if already authenticated
            />
            <Route
              path="/home"
              element={<AppAuthWrapper element={<HomePage />} />}
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </ChatContextProvider>
      </FirestoreProvider>
    </AuthProvider>
  );
}

export default App;
