import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import LoadingSpinner from './LoadingSpinner';

const PrivateRoutes: React.FC = () => {
  const { user, loading } = useUser();

  if (loading) {
    return <LoadingSpinner />;
  }

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
