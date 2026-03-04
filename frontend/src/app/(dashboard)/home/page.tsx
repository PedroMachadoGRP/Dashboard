
'use client'

import { useAuth } from "@/app/context/useAuth"
import { me } from "@/services/auth.service"
import { useEffect, useState } from "react"
import UserActivityCard from "@/components/profile/userActivityCard"
import { UserService } from "@/services/user.service"
import { Activity, ActivityService } from "@/services/activity.service"
import { DialogModal, Weekday } from "@/components/ui/dialogModal"
import { useSnackbar } from "notistack"


interface User {
  id: number
  name: string
  email: string
}



export default function Page() {
  const [user, setUser] = useState<User | null>(null)
  const [activities, setActivities] = useState<Activity[]>([])
  const [loadingActivities, setLoadingActivities] = useState(false)
  const { enqueueSnackbar } = useSnackbar()
  const { userId, } = useAuth()

  async function handleCreateActivity(data: { title: string, days: Weekday[] }) {
    try {
      await ActivityService.createActivity({
        title: data.title,
        user: { id: Number(userId) },
        activityDay: data.days.map(day => ({ day }))
      })

      await loadActivities()

      enqueueSnackbar(`Atividade ${data.title} criada com sucesso`, {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });

    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        "Erro ao criar atividade";

      enqueueSnackbar(message, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
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
        <h2 className=" text-start text-4xl  antialiased text-neutral-500 dark:text-zinc-100 ">Seja bem vindo, {user?.name}</h2>
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

    </div>

  )

}