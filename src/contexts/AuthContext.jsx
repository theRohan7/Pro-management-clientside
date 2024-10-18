import React, { createContext, useEffect, useState } from "react";
import axios from "axios";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [userDetails, setUserDetails] = useState(null);
    const [error, setError] = useState(null);    
    const [loading, setLoading] = useState(false);

    const login = (userData) => {
        setUserDetails(userData);
    }

    const logout = () => {
        setUserDetails(null);
        localStorage.removeItem("user-token");
        setLoading(false);
    }    

    if(loading){
        return <div>Loading Auth...</div>
    }

    return (
        <AuthContext.Provider value={{userDetails, login, logout}} >
            {children}
        </AuthContext.Provider>
    )


}