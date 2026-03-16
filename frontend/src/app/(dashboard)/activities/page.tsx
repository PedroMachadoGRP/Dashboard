"use client"

import { Activity, ActivityService } from '@/services/activity.service'
import { me } from '@/services/auth.service'
import { useEffect, useState } from 'react'
import { User } from '../home/page'
import ActivityList from '@/components/ui/activityList'

export default function Page() {

    const [user, setUser] = useState<User | null>(null)
    const [activities, setActivities] = useState<Activity[] | null>([])
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0)
    const activityLimit = 5
    const totalPages = Math.ceil(total / activityLimit)

    useEffect(() => {
        async function loadUser() {
            try {
                const data = await me()
                setUser(data)
            } catch (error: any) {
                setUser(null)
                console.error(error);

            }

        }
        loadUser()
    }, [])

    useEffect(() => {
        async function loadActivities() {
            try {


                const offset = (page - 1) * activityLimit
                const data = await ActivityService.getNextActivities(activityLimit, offset)
                setActivities(data.activities)
                setTotal(data.total)

                console.log("PAGE:", page)
                console.log("OFFSET:", offset)
            } catch {
                setActivities([])
            }


        }
        loadActivities();
    }, [page])


    return (
        <div className="flex items-center justify-center min-h-screen ">
            <div className="flex flex-col bg-neutral-50 dark:bg-[#141414] text-neutral-700 dark:text-neutral-100 drop-shadow-black drop-shadow-xl/15 dark:drop-shadow-white dark:drop-shadow-xl/2 rounded-lg w-250 h-175 p-2">
                <header>
                    <section className='flex items-center justify-between w-full'>
                        <h1 className="text-start text-3xl antialiased text-neutral-500 dark:text-zinc-100">Suas atividades recentes</h1>

                        <div className="flex  items-center h-7  gap-3">
                            <button
                                disabled={page === 1}
                                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                                className="px-3 py-1 bg-transparent hover:border-neutral-400 hover:border transition duration-200 rounded"
                            >
                                <span>&#60;</span>
                            </button>

                            <button
                                disabled={page >= totalPages}
                                onClick={() => setPage((p) => p + 1)}
                                className="px-3 py-1 bg-transparent hover:border-neutral-400 hover:border transition duration-200 rounded"
                            >
                                <span>&#62;</span>
                            </button>
                        </div>
                    </section>
                </header>
                <main className=" flex flex-col p-5">
                    <section className='flex self-end '>
                        <h2>Página {page}</h2>
                    </section>
                    <ActivityList name={user?.name ?? ""} activities={activities ?? []} />
                </main>

            </div>

        </div>
    )
}
