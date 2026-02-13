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

export interface User {
  id: string
  name: string
  email: string
}

export async function registerUser(data:RegisterData) {
    const response = await api.post("/auth/register",data)

    return response.data
}

export async function loginUser(data:LoginData):Promise<User> {
    const response = await api.post("/auth/login",data);
    return response.data
}

export async function logoutUser(){
    await api.post("/auth/logout")
}

export async function me(){
    const responese = await api.get("/auth/me")
    return responese.data
}