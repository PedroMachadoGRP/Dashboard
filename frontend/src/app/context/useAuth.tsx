/* eslint-disable react-hooks/set-state-in-effect */

import { useRouter } from "next/navigation"
import { createContext, useContext, useEffect, useState } from "react"

interface InterfaceAuthContext {
    userId:string | null,
    login:(id:string) => void,
    logout: () => void
}

const AuthContext = createContext<InterfaceAuthContext | null>(null)

export function AuthProvider({children}:{children:React.ReactNode}){

    const [userId, setUserId] = useState<string | null>(null)
    const router = useRouter()

    useEffect(() =>{
        const storage = localStorage.getItem("userId")
        if(storage) setUserId(storage)
    },[])

    const login = (id:string) =>{
        setUserId(id)
        localStorage.setItem("userId",id)
    }

    const logout = () =>{
        setUserId(null)
        localStorage.removeItem("userId")
        localStorage.removeItem("token")
        router.push("/")
    }

    return (
        <AuthContext.Provider value={{userId,login,logout}}>
            {children}
        </AuthContext.Provider>       
    )
}

export const useAuth = () => {
    const ctx = useContext(AuthContext)
    if(!ctx) throw new Error("useAuth deve estar dentro do AuthProvider")
    return ctx
}