import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  // const user = null;
  if (!user) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }
  return children;
};
