import { api } from "./api";

interface RegisterPayload {
    name: string
    email: string
    password: string
}


interface LoginPayload {
    email: string
    password: string
}

export const AuthService = {

    async login(data: LoginPayload) {
        const response = await api.post('/auth/login', data)
        return response.data
    },

    async register(data:RegisterPayload) {
        const response = await api.post('/auth/register',data)
        return response.data
    }
}