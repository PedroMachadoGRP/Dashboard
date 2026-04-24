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
        <div className="flex justify-center items-start min-h-screen p-4 md:p-8">

            <div className="
            w-full max-w-4xl
            flex flex-col
            gap-4
            p-4 md:p-6
            rounded-xl
            bg-neutral-50 dark:bg-[#141414]
            text-neutral-700 dark:text-neutral-100
            shadow-lg
        ">
                <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                    <h1 className="text-xl md:text-2xl lg:text-3xl text-neutral-600 dark:text-zinc-100">
                        Suas atividades recentes
                    </h1>


                    <div className="flex items-center gap-2 self-end sm:self-auto">

                        <button
                            disabled={page === 1}
                            onClick={() => setPage((p) => Math.max(p - 1, 1))}
                            className="
                                px-3 py-1.5
                                rounded-md
                                border
                                border-transparent
                                hover:border-neutral-400
                                disabled:opacity-40
                                transition">

                            &#60;

                        </button>

                        <span className="text-sm md:text-base">
                            {page} / {totalPages || 1}
                        </span>

                        <button
                            disabled={page >= totalPages}
                            onClick={() => setPage((p) => p + 1)}
                            className="
                            px-3 py-1.5
                            rounded-md
                            border
                            border-transparent
                            hover:border-neutral-400
                            disabled:opacity-40
                            transition">
                            &#62;
                        </button>

                    </div>
                </header>

                <main className="flex flex-col gap-3">

                    <div className="text-right text-sm text-neutral-400">
                        Página {page}
                    </div>

                    <div className="max-h-[70vh] overflow-y-auto pr-1">
                        <ActivityList
                            name={user?.name ?? ""}
                            activities={activities ?? []}
                        />
                    </div>

                    {activities?.length === 0 && (
                        <p className="text-center text-neutral-400 mt-4">
                            Nenhuma atividade encontrada.
                        </p>
                    )}

                </main>

            </div>
        </div>
    )
}
