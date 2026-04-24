

import { api } from "@/services/api"
import { loginUser, logoutUser, me, registerUser } from "@/services/auth.service"
import { useRouter } from "next/navigation"
import { createContext, useContext, useEffect, useState } from "react"

interface InterfaceAuthContext {
    userId: string | null,
    login: (email: string, password: string) => Promise<void>
    register:(data:RegisterUser) => Promise<void>
    loading: boolean,
    logout: () => void
}


interface RegisterUser {
    name:string;
    lastName:string
    email:string;
    password:string
}



const AuthContext = createContext<InterfaceAuthContext | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {

    const [userId, setUserId] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        async function loadUser() {
            try {
                const user = await me()
                setUserId(user.id)

            } catch {
                setUserId(null)
            } finally {
                setLoading(false)
            }
        }

        loadUser()
    }, [])

    async function login(email: string, password: string) {
        await loginUser({ email, password })

        const user = await me()
        setUserId(user.id)

        router.push("/home")
    }

    async function register(data:RegisterUser) {
        await registerUser(data);
        const user = await me()
        setUserId(user.id)

        router.push("/home")
    }

    async function logout() {

        await logoutUser()

        setUserId(null)

        router.push("/")
    }


    return (
        <AuthContext.Provider value={{ userId, loading, login,register, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error("useAuth deve estar dentro do AuthProvider")
    return ctx
}