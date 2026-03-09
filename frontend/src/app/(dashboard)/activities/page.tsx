"use client"

import { Activity, ActivityService } from '@/services/activity.service'
import { me } from '@/services/auth.service'
import { useEffect, useState } from 'react'
import { User } from '../home/page'
import ActivityList from '@/components/ui/activityList'

export default function Page() {

    const [user, setUser] = useState<User | null>(null)
    const [activities, setActivities] = useState<Activity[] | null>([])



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
                const data = await ActivityService.getActivities(5)
                setActivities(data)

            } catch {
                setActivities([])
            }


        }
        loadActivities();
    }, [])


    return (
        <div className="flex items-center justify-center min-h-screen ">
            <div className="flex flex-col bg-neutral-50 dark:bg-[#141414] text-neutral-700 dark:text-neutral-100 drop-shadow-black drop-shadow-xl/15 dark:drop-shadow-white dark:drop-shadow-xl/2 rounded-lg w-250 h-170 p-5">
                <header>
                    <section className=''>
                        <h1 className="text-start text-3xl antialiased text-neutral-500 dark:text-zinc-100">Suas atividades recentes</h1>
                        <hr className='text-gray-100 dark:text-gray-700' />
                    </section>
                </header>

                <main className="p-5">
                    <ActivityList name={user?.name ?? ""} activities={activities ?? []} />
                </main>
            </div>

        </div>
    )
}
