
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

    <div>
        <header>
            <h1>Seu perfil</h1>
        </header>

        <main>
            <section>
                <div>
                    {user?.name}
                    {user?.email}
                </div>
            </section>
        </main>
    </div>

  )

}