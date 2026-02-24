import { api } from "./api"

interface UpdateData {
    name:string 
    email:string 
    password:string
}


export const UserService = {

    async update(userId:number, data:Partial<UpdateData>) {
        const response = await api.patch(`/users/update/${userId}`,data)
        return response.data
    },

    async delete(userId:number){
        const response = await api.delete(`/users/delete/${userId}`)
        return response.data
    }
}