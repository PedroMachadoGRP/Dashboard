
'use client'

import { useAuth } from "@/app/context/useAuth"
import { me } from "@/services/auth.service"
import { useEffect, useState } from "react"
import UserActivityCard from "@/components/profile/userActivityCard"
import { UserService } from "@/services/user.service"
import { Activity, ActivityService } from "@/services/activity.service"
import { DialogModal, Weekday } from "@/components/ui/dialogModal"


interface User {
  id: number
  name: string
  email: string
}



export default function Page() {
  const [user, setUser] = useState<User | null>(null)
  const [activities, setActivities] = useState<Activity[]>([])
  const [loadingActivities, setLoadingActivities] = useState(false)
  const { userId, } = useAuth()


  const handleUpdate = async (id: number) => {
    try {
      const updateUser = await UserService.update(id, { name: "Abacate" })
      setUser(updateUser)


    } catch (error) {
      console.error(error);

    }
  }

  async function handleCreateActivity(data: {
    title: string
    days: Weekday[]
  }) {
    try {
      await ActivityService.createActivity({
        title: data.title,
        user: { id: Number(userId) },
        activityDay: data.days.map(day => ({ day }))
      })

      // Atualiza lista após criar
      await loadActivities()

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

    async function loadActivities() {
    try {
      setLoadingActivities(true)
      const data = await ActivityService.getActivities()
      setActivities(data)
    } catch {
      setActivities([])
    } finally {
      setLoadingActivities(false)
    }
  }

  useEffect(() => {
    loadActivities()
  }, [])




  return (

    <div className="flex flex-1 flex-col  h-full w-full p-5 gap-10">
      <header className="flex p-2 h-25 bg-white rounded-2xl drop-shadow-black drop-shadow-xl/10 dark:drop-shadow-white dark:bg-blue-800">
        <h2 className=" text-start text-4xl  antialiased text-neutral-500 dark:text-zinc-100 ">Hello, {user?.name}</h2>
      </header>

      <section className="flex flex-col gap-2">
        <div className="flex flex-row gap-5">
          <h1 className="text-start text-3xl antialiased text-neutral-500 dark:text-zinc-100">Suas atividades</h1>
          <DialogModal onCreate={handleCreateActivity} />
        </div>

        <div className="flex justify-between flex-row">
          {activities?.map(activity => (
            <UserActivityCard
              key={activity.id}
              title={activity.title}
              days={activity.activityDay}
            />
          ))}
        </div>
      </section>

      {/* <section>
        <button className="bg-amber-50" onClick={() => user && handleUpdate(user?.id)}>
          Atualizar
        </button>

        <button
          onClick={handleCreate}
          className="bg-green-500 text-white p-3 rounded"
        >
          Criar Activity (TESTE)
        </button>

      </section> */}


    </div>

  )

}