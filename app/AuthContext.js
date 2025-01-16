"use client"

import { createContext, useContext, useState ,useEffect} from "react";

//creating the context

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

 
   
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [adminLoggedIn, setAdminLoggedIn] = useState(false)
    const [totalItems, setTotalItems] = useState(0);
    const [bucketItems, setBucketItems] = useState([]);
    const [userID, setUserID] = useState();
    const [userData, setUserData] = useState(null); // state to store user data

 



    return (
        <AuthContext.Provider value={{ bucketItems, setBucketItems, isLoggedIn, setIsLoggedIn,adminLoggedIn,setAdminLoggedIn, totalItems, setTotalItems, userData, setUserData, userID, setUserID }}>
            {children}
        </AuthContext.Provider>
    )
}
