import { createContext, useContext, useState, useEffect } from "react";
import APP_API from "../utils/api";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      if (isAuthenticated) {
        try {
          const response = await APP_API.getCurrentUserProfile();
          setUsername(response.data.username);
        } catch (error) {
          console.log("Error fetching user data", error);
        }
      } else {
        setUsername("");
      }
    };

    fetchUserData();
  }, [isAuthenticated]);

  const login = (token) => {
    const now = new Date();
    localStorage.setItem("loginTime", now.getTime().toString());
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  const checkSession = () => {
    const loginTime = localStorage.getItem("loginTime");
    const now = new Date();

    const sessionDuration = 1000 * 60 * 60 * 24;

    if (now.getTime() - Number(loginTime) > sessionDuration) {
      logout();
    }
  };

  const value = {
    isAuthenticated,
    username,
    login,
    logout,
    checkSession,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
