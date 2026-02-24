
'use client'

import { useAuth } from "@/app/context/useAuth"
import { me } from "@/services/auth.service"
import { useEffect, useState } from "react"
import UserActivityCard from "@/components/profile/userActivityCard"
import { UserService } from "@/services/user.service"
import { Activity, ActivityService } from "@/services/activity.service"

interface User {
  id: number
  name: string
  email: string
}

export default function Page() {
  const [user, setUser] = useState<User | null>(null)
  const [activities, setActivities] = useState<Activity[]>([])
  const [title, setTitle] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const { userId, } = useAuth()


  const handleUpdate = async (id: number) => {
    try {
      const updateUser = await UserService.update(id, { name: "Abacate" })
      setUser(updateUser)


    } catch (error) {
      console.error(error);

    }
  }

  const handleCreate = async () => {
    try {
      await ActivityService.createActivity({
        title: "Academia",
        user: { id: Number(userId) },
        activityDay: [
          { day: "Segunda" },
          { day: "Quarta" }
        ]
      })
    } catch (error: any) {
      console.log(error.response?.data)
    }
  }

  useEffect(() => {

    async function loadUser() {
      try {
        const data = await me()
        setUser(data)

      } catch {
        setUser(null)
      }
    }
    loadUser()
  }, [])

  useEffect(() => {
    async function loadActivities() {
      try {
        const data = await ActivityService.getActivities()
        setActivities(data)

      } catch {
        setActivities([])
      }
    }
    loadActivities()
  }, [])




  return (

    <div className="flex flex-1 flex-col bg-gray-100 dark:bg-black h-full w-full p-5 gap-10">
      <header className="flex p-2 h-25 bg-white rounded-2xl drop-shadow-black drop-shadow-xl/10 dark:drop-shadow-white">
        <h2 className=" text-start text-4xl  antialiased text-neutral-500">Hello, {user?.name}</h2>
      </header>

      <section>
        <button className="bg-amber-50" onClick={() => user && handleUpdate(user?.id)}>
          Atualizar
        </button>

        <button
          onClick={handleCreate}
          className="bg-green-500 text-white p-3 rounded"
        >
          Criar Activity (TESTE)
        </button>

      </section>
      <section className="flex flex-col justify-center ">
        <div className="flex flex-row">
          {activities?.map(activity => (
            <UserActivityCard
              key={activity.id}
              title={activity.title}
              days={activity.activityDay}
            />
          ))}
        </div>
      </section>


    </div>

  )

}