import { createContext, useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useLocalStorage("authToken", null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = async (data) => {
    fetch("http://localhost:3333/api/auth/login", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          console.log("data:", data);
          setAuth(data.token);
          navigate("/dashboard/profile");
        } else {
          alert(data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const logout = () => {
    setAuth(null);
    navigate("/login", { replace: true });
  };

  const verifyToken = async () => {
    fetch("http://localhost:3333/api/auth/authen", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          console.log("data:", data);
          setUser(data.decoded.email);
        } else {
          if (data.message === "jwt expired") alert(data.message);
          else if (data.message === "jwt malformed") {
          }
          logout();
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        logout();
      });
  };

  const getUser = async () => {
    fetch("http://localhost:3333/api/auth/user", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          console.log(data);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const value = useMemo(
    () => ({
      auth,
      user,
      login,
      logout,
      verifyToken,
      getUser,
    }),
    [auth, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
