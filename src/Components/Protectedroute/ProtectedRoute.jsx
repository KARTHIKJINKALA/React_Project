import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    fetch("https://jobquest-backend-l0ol.onrender.com/verify-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.valid) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      })
      .catch(() => setIsAuthenticated(false));
  }, [token]);

  // While authentication is being checked, show a loading message
  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  // If authenticated, render the protected pages, otherwise redirect to login
  return isAuthenticated ? <Outlet /> : <Navigate to="/Login" />;
};
