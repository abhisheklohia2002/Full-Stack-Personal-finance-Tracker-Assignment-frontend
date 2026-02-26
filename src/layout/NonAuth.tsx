import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function NonAuth() {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (user) return <Navigate to="/" replace />;

  return <Outlet />;
}