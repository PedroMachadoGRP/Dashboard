import { api } from "./api"


export interface ActivityDay {
    id?: number
    day:string
}

export interface Activity {
    id?: number
    title:string
    activityDay:ActivityDay[]
}

interface ActivityRegister {
    title:string,
    user:{id:number}
    activityDay:ActivityDay[]
}

export const ActivityService = {
    
    async createActivity(data:ActivityRegister){
        const response = await api.post("/activities/create/",data)
        return response.data
    },

    async getActivities(){
        const response = await api.get("/activities")
        return response.data
    },

    async updateActivity(userId:number,data:Partial<Activity>){
        const response = await api.patch(`/activities/${userId}`,data)
        return response.data
    },

    async deleteActivity(userId:number){
        await api.delete(`/activities/${userId}`)
    },
}