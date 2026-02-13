/* eslint-disable react-hooks/set-state-in-effect */
'use client'

import { useAuth } from "@/app/context/useAuth"
import ActivityGroupModal from "@/components/profile/activityGroupModal"
import { me } from "@/services/auth.service"
import axios from "axios"
import { use, useEffect, useEffectEvent, useState } from "react"

interface Group {
    id: number,
    title: string,
    description: string
}

interface User {
    id: number
    name: string
    email: string
}

interface PublicarMaterialDTO {
    title: string
    description: string
    user: {
        id: number
    }
}



export default function Page() {


    const [user, setUser] = useState<User | null>(null)
    const [token, setToken] = useState<string | null>(null)
    const [group, setGroup] = useState<Group[]>([])
    const [title, setTitle] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const { userId, } = useAuth()
    const [publi, setPubli] = useState<PublicarMaterialDTO>({
        title: title,
        description: description,
        user: { id: Number(userId) }
    })



    const publicar = async () => {
        try {
            const response = await axios.post('http://localhost:3333/groups/', publi)
            alert("funcionando")
            return response.data
        } catch (e) {
            console.log("Error: " + e);

        }
    }

    useEffect(() => {
        setToken(localStorage.getItem("token"))
    })

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
        const showGroup = async () => {
            try {
                const response = await axios.get('http://localhost:3333/groups/')
                setGroup(response.data)
            } catch (e) {
                console.log("Error: " + e);
            }
        }

        showGroup()

    }, [])


    return (

        <div className="flex flex-1 flex-col">
            <header className="flex p-2 h-25 ">
                <h2 className=" text-start text-4xl  antialiased text-neutral-500">Hello, {user?.name}</h2>
            </header>


            <section className="flex flex-col justify-center ">
                <h2 className="ml-2">Your groups</h2>
                <div className="flex flex-row">
                    {group.map((item, index) => (
                        <ActivityGroupModal
                            key={index}
                            title={item.title}
                            desc={item.description}
                        />
                    ))}
                </div>
            </section>


            <section>
                <h2>Activities stats</h2>
            </section>





        </div>

    )

}