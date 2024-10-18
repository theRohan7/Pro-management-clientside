import React, { createContext, useEffect, useState } from "react";
import axios from "axios";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);    
    const [loading, setLoading] = useState(false);

    const login = (userData, token) => {
        setLoading(true)
        setUser(userData);
        localStorage.setItem("user-token", token);
        setLoading(false);
    }

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user-token");
        setLoading(false);
    }

    if(loading){
        return <div>Loading Auth...</div>
    }

    return (
        <AuthContext.Provider value={{user, login, logout}} >
            {children}
        </AuthContext.Provider>
    )


}