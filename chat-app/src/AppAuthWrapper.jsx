import React from 'react';
import { useState, useEffect } from 'react';
import { Navigate, Route } from 'react-router-dom';
import { useAuth, useFirestore, useUser } from 'reactfire';
import { auth } from './firebase';
import HomePage from './pages/HomePage';

 const AppAuthWrapper = ({ element: Element, ...rest }) => {
  const auth = useAuth();
  const firestore = useFirestore();
  const { data: currentUser } = useUser();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      // You can perform any additional actions here if needed
    });

    return () => unsubscribe();
  }, [auth]);

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return <HomePage/>;
};

export default AppAuthWrapper;
