import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getLoggedInUser();
  }, []);

  const getLoggedInUser = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("drukdragon-token");
      if (!token) {
        setLoggedIn(false);
        setLoading(false);
        return;
      }

      const response = await axios.get(
        "http://localhost:3000/auth/loggedin-user",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLoggedIn(true);
      setUser(response.data.user);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoggedIn(false);
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem("drukdragon-token");
      if (!token) {
        
        setLoggedIn(false);
        setLoading(false);
        return;
        
      }
      await axios.delete("http://localhost:3000/auth/signout", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setLoggedIn(false);
      setUser({});
      localStorage.setItem("drukdragon-token", "");
    } catch (error) {
      console.error(error);
      setLoggedIn(false);
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, user, isLoading, getLoggedInUser, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
