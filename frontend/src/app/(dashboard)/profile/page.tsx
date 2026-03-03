
'use client'

import { useAuth } from "@/app/context/useAuth"
import { me } from "@/services/auth.service"
import { useEffect, useState } from "react"
import UserActivityCard from "@/components/profile/userActivityCard"
import { UserService } from "@/services/user.service"
import { Activity, ActivityService } from "@/services/activity.service"
import ProfileField from "@/components/profile/profileField"
import ProfilePasswordField from "@/components/profile/profilePasswordField"

interface User {
  id: number
  name: string
  lastName: string
  email: string
  password: string
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


  return (


    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col bg-neutral-50 dark:bg-[#141414] text-neutral-700 dark:text-neutral-100 rop-shadow-black drop-shadow-xl/15 dark:drop-shadow-white dark:drop-shadow-xl/2 rounded-lg w-250 h-130 p-5">

        <header className="h-20">
          <h2 className="text-2xl">Seu perfil</h2>
        </header>

        <main className="flex flex-col gap-1">

          <h2 className="text-2xl">Suas informações</h2>
          <hr className='text-gray-100 dark:text-gray-700' />

          <section className="grid grid-cols-2 gap-4 w-full">
            <ProfileField title="Nome" info={user?.name} />
            <ProfileField title="Sobrenome" info={user?.lastName} />
            <ProfileField title="Email" info={user?.email} />
            <ProfilePasswordField title="Senha" info={"••••••••"} />
          </section>
        </main>


        {/* <section>
          <button className="text-red-900 border ">Editar</button>
        </section> */}

      </div>
    </div>

  )

}