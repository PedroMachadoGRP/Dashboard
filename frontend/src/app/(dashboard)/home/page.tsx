
'use client'

import { useAuth } from "@/app/context/useAuth"
import { me } from "@/services/auth.service"
import axios from "axios"
import { use, useEffect, useEffectEvent, useState } from "react"
import UserActivityCard from "@/components/profile/userActivityCard"

interface User {
  id: number
  name: string
  email: string
}



export default function Page() {
  const [user, setUser] = useState<User | null>(null)
  const [title, setTitle] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const { userId, } = useAuth()

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

    <div className="flex flex-1 flex-col dark:bg-black">
      <header className="flex p-2 h-25 ">
        <h2 className=" text-start text-4xl  antialiased text-neutral-500">Hello, {user?.name}</h2>
      </header>


      <section className="flex flex-col justify-center ">
        <div className="flex flex-row">
          <UserActivityCard />
        </div>
      </section>


      <div className="p-6 bg-red-200 dark:bg-blue-900">
        TESTE DARK MODE
      </div>


    </div>

  )

}