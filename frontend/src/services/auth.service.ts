import { api } from "./api";

interface LoginData {
    email:string;
    password:string
}

interface RegisterData {
    name:string;
    email:string;
    password:string
}

interface LoginResponse {
    token: string;
    user: {
        id:string;
        name:string;
        email:string;
    }
}

export async function registerUser(data:RegisterData) {
    const response = await api.post("/auth/register",data)

    return response.data
}

export async function loginUser(data:LoginData):Promise<LoginResponse> {
    const response = await api.post("/auth/login",data);
    return response.data
}
