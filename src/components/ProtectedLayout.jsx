import { useEffect } from "react";
import { useOutlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const ProtectedLayout = () => {
  const { auth, user, verifyToken } = useAuth();
  const outlet = useOutlet();

  useEffect(() => {
    verifyToken();
  }, []);

  if (auth) {
    return (
      <div>
        ProtectedLayout...
        <p>{user}</p>
        {outlet}
      </div>
    );
  }
  return null;
  // return <Navigate to="/" />;
};
