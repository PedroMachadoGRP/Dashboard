import React, { createContext, useContext, useState } from "react"


interface UserContext {
    userId:number | null
    setUserId: (id:number) => void
}

const UserContex = createContext<UserContext>({
    userId:null,
    setUserId: () => { }
})


export function UserProvider({children} : {children:React.ReactNode}){
    const [userId, setUserId] = useState<number | null>(null)

    return (
        <UserContex.Provider value={{userId,setUserId}}>
            {children}
        </UserContex.Provider>
    )
}

export function useUser(){
    return useContext(UserContex)
}