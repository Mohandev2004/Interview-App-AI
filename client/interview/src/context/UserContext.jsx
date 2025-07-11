import React, { createContext, useEffect, useState } from "react";
import axiosInstance from "../utills/axios";
import { API_PATHS } from "../utills/apiPaths";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Clear user on logout
  const clearUser = () => {
    setUser(null);
  };

  // Fetch user profile once on app load (if token is set in axiosInstance)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
        setUser(response.data);
      } catch (error) {
        console.error("User not authenticated", error);
        clearUser(); // Clear user if unauthorized
      } finally {
        setLoading(false); // ✅ Make sure this always runs
      }
    };

    fetchUser();
  }, []);

  // Call this on successful login or registration
  const updateUser = (userData) => {
    setUser(userData);
    setLoading(false);
  };

  return (
    <UserContext.Provider value={{ user, loading, updateUser, clearUser }}>
      {/* ✅ Prevent children from rendering until loading is complete */}
      {!loading && children}
    </UserContext.Provider>
  );
};

export default UserProvider;
