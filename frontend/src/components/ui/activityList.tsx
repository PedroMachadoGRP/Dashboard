import { Activity } from '@/services/activity.service'

const weekDays = [
    { label: "Seg", value: "SEGUNDA" },
    { label: "Ter", value: "TERÇA" },
    { label: "Qua", value: "QUARTA" },
    { label: "Qui", value: "QUINTA" },
    { label: "Sex", value: "SEXTA" },
    { label: "Sáb", value: "SABADO" },
    { label: "Dom", value: "DOMINGO" },
]

export default function ActivityList(props: { name: string, activities: Activity[] }) {

    return (
        <main>
            <section className="flex flex-col divide-y divide-neutral-200 dark:divide-[#3d3d3d]">

                {props.activities?.map(activity => (
                    <button
                        key={activity.id}
                        onClick={() => console.log(activity.id)}
                        className="
                        w-full text-left
                        p-3 md:p-4
                        bg-neutral-50 dark:bg-[#141414]
                        hover:opacity-90 transition">

                        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

                            <div className="flex flex-col sm:flex-row sm:gap-6">

                                <div>
                                    <h2 className="text-xs md:text-sm text-neutral-400">
                                        Usuário
                                    </h2>
                                    <h3 className="font-medium text-sm md:text-base">
                                        {props.name}
                                    </h3>
                                </div>

                                <div>
                                    <h2 className="text-xs md:text-sm text-neutral-400">
                                        Título
                                    </h2>
                                    <h3 className="font-medium text-sm md:text-base wrap-anywhere">
                                        {activity.title}
                                    </h3>
                                </div>

                            </div>

                            <div className="flex flex-col gap-1">

                                <h2 className="text-xs md:text-sm text-neutral-400">
                                    Dias da semana
                                </h2>

                                <div
                                    className="
                                    grid gap-2
                                    grid-cols-5
                                    sm:grid-cols-7">
                                    {weekDays.map(day => {
                                        const isActive = activity.activityDay?.some(
                                            d => d.day?.toUpperCase() === day.value
                                        )

                                        return (
                                            <span
                                                key={day.value}
                                                className={`
                                                    text-xs md:text-sm
                                                    px-2 py-1 rounded-md text-center
                                                    transition
                                                ${isActive
                                                        ? "bg-blue-800 dark:bg-violet-800 text-white"
                                                        : "bg-gray-300 opacity-40 text-black dark:text-black"}
                                                        `}
                                            >
                                                {day.label}
                                            </span>
                                        )
                                    })}
                                </div>

                            </div>

                        </div>

                    </button>
                ))}

            </section>

            <hr className="mt-2 border-neutral-200 dark:border-[#3d3d3d]" />
        </main>
    )
}