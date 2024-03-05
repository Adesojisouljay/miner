import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

//Needs proper checking

const ProtectedRoute = ({ path, element }) => {
  const isAuthenticated = useSelector(state => state.global.apexMiner.isAuthenticated);

  return (
    <Route
      path={path}
      element={isAuthenticated ? element : <Navigate to="/login" replace />}
    />
  );
};

export default ProtectedRoute;
