"use client"

import { createContext, useContext,Dispatch, SetStateAction, useState } from "react"


type AuthContextProps = {
    userId:string,
    setUserId: Dispatch<SetStateAction<string>>,
    token: string,
    setToken: Dispatch<SetStateAction<string>>,
    isLoggedIn:boolean,
    setLoginState: Dispatch<SetStateAction<boolean>>,
}

const AuthContext = createContext<AuthContextProps>({
    userId:"",
    setUserId: () => {},
    token: "",
    setToken: () => {},
    isLoggedIn:false,
    setLoginState: () => {},
})

export const AuthContextProvider = ({children}:any) => {
    const [token, setToken] = useState("")
    const [isLoggedIn, setLoginState] = useState(false)
    const [userId, setUserId] = useState("")
    return (
        <AuthContext.Provider value={{userId,setUserId,token, setToken,isLoggedIn,setLoginState}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);

