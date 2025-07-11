import React, { createContext, useEffect, useState } from "react";
import axiosInstance from "../utills/axios";
import { API_PATHS } from "../utills/apiPaths";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("token"); // Optional: remove token on logout
  };

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        clearUser();
        setLoading(false);
        return;
      }

      try {
        const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
        setUser(response.data);
      } catch (error) {
        console.error("User not authenticated", error);
        clearUser();
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const updateUser = (userData) => {
    setUser(userData);
    setLoading(false);
  };

  return (
    <UserContext.Provider value={{ user, loading, updateUser, clearUser }}>
      {!loading && children}
    </UserContext.Provider>
  );
};

export default UserProvider;
