import React, { createContext } from "react";
import axiosInstance from "../utills/axios";
import { API_PATHS } from "../utills/apiPaths";
import { useState } from "react";
import { useEffect } from "react";

export const UserContext = createContext();

const UserProvider = ({ children  }) =>{
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const clearUser = () => {
        setUser(null);
        localStorage.removeItem("token");
    };

    useEffect( () => {
        if(user) return;

        const accessToken = localStorage.getItem("token");
        if(!accessToken) {
            setLoading(false);
            return;
        }

        const fetchUser = async () => {
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
        // console.log(userData.token)
        // setUser(userData);
        // localStorage.setItem("token", userData.token);
        setLoading(false);
    };

    
    
        return (
            <UserContext.Provider value={{ user, loading, updateUser, clearUser}}>
                {children }
            </UserContext.Provider>
        )
    };

    export default UserProvider;

