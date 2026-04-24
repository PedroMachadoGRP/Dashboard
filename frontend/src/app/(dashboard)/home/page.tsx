
'use client'
import { useAuth } from "@/app/context/useAuth"
import { me } from "@/services/auth.service"
import { useEffect, useState } from "react"
import UserActivityCard from "@/components/profile/userActivityCard"
import { UserService } from "@/services/user.service"
import { Activity, ActivityService } from "@/services/activity.service"
import { DialogModal, Weekday } from "@/components/ui/dialogModal"
import { useSnackbar } from "notistack"
import Card from "@/components/ui/testCard"


export interface User {
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

    if (!userId) {
      enqueueSnackbar("Usuário não identificado", { variant: "error" })
      return
    }

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

    console.log(data);

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
      const data = await ActivityService.getActivities(3)
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
    <div className="flex flex-col w-full min-h-screen p-4 md:p-6 gap-8">

      {/* HEADER */}
      <header
        className="
          w-full
          rounded-2xl
          p-4 md:p-6
          bg-gradient-to-r from-neutral-50 to-zinc-100
          dark:from-blue-800 dark:to-indigo-900
          shadow-md
        "
      >
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-neutral-600 dark:text-zinc-100">
          Seja bem-vindo, {user?.name}
        </h2>
      </header>

      {/* SECTION */}
      <section className="flex flex-col gap-4">

        {/* Título + botão */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between md:justify-start gap-3">
          <h1 className="text-xl md:text-2xl lg:text-3xl text-neutral-600 dark:text-zinc-100">
            Suas atividades recentes
          </h1>

          <DialogModal onCreate={handleCreateActivity} />
        </div>

        {/* LISTA */}
        <div
          className="
            grid gap-4
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
          "
        >
          {activities?.map(activity => (
            <UserActivityCard
              key={activity.id}
              title={activity.title}
              days={activity.activityDay}
            />
          ))}
        </div>

        {/* Estado vazio */}
        {activities.length === 0 && !loadingActivities && (
          <p className="text-center text-neutral-400 mt-4">
            Nenhuma atividade encontrada.
          </p>
        )}

      </section>

    </div>

  )

}