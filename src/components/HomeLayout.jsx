import { Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const HomeLayout = () => {
  const { auth } = useAuth();
  const outlet = useOutlet();

  if (auth) {
    return <Navigate to="/dashboard/profile" replace />;
  }

  return (
    <div>
      HomeLayout...
      {outlet}
    </div>
  );
};
