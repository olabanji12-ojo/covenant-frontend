import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';

interface GuestRouteProps {
  children: React.ReactNode;
}

export const GuestRoute = ({ children }: GuestRouteProps) => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  // Allow guests (is_guest=true) through — they still need to reach /signup
  // Only redirect fully-registered, non-guest authenticated users away from auth pages
  if (isAuthenticated && !user?.is_guest) {
    return <Navigate to="/app/discover" replace />;
  }

  return children;
};
