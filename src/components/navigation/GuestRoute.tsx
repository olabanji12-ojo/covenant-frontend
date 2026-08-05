import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';

interface GuestRouteProps {
  children: React.ReactNode;
}

export const GuestRoute = ({ children }: GuestRouteProps) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  if (isAuthenticated) {
    return <Navigate to="/app/discover" replace />;
  }

  return children;
};
