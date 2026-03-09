import { Activity} from '@/services/activity.service'

const weekDays = [
    { label: "Seg", value: "SEGUNDA" },
    { label: "Ter", value: "TERÇA" },
    { label: "Qua", value: "QUARTA" },
    { label: "Qui", value: "QUINTA" },
    { label: "Sex", value: "SEXTA" },
    { label: "Sáb", value: "SABADO" },
    { label: "Dom", value: "DOMINGO" },
]

export default function ActivityList(props:{name:string, activities:Activity[]}) {


    return (
        <main>
            <section className='flex flex-col gap-4'>
                {props.activities?.map(activity => (
                    <section key={activity.id}  className="flex justify-between items-start  border-t dark:border-[#3d3d3d] border-neutral-200  bg-neutral-50 dark:bg-[#141414] p-1  hover:cursor-pointer hover:opacity-90">

                        <div className="flex flex-col items-center">
                            <h2 className="font-semibold">Usuário</h2>
                            <h3>{props.name}</h3>
                        </div>

                        <div className="flex flex-col items-center">
                            <h2 className="font-semibold">Título</h2>
                            <h3>{activity.title}</h3>
                        </div>

                        <div className="flex flex-col items-center">
                            <h2 className="font-semibold">Dias da semana</h2>

                            <div className="grid grid-cols-4 gap-2 mt-2">
                                {weekDays.map(day => {

                                    const isActive = activity.activityDay?.some(
                                        d => d.day?.toUpperCase() === day.value 
                                    )

                                    return (
                                        <span
                                            key={day.value}
                                            className={`px-3 py-1 rounded-lg text-sm text-center
                                            ${isActive
                                                    ? "bg-blue-800 dark:bg-violet-800 text-neutral-200 trasition duration-300 "
                                                    : "bg-gray-200 opacity-40 text-black"}
                                            `}
                                        >
                                            {day.label}
                                        </span>
                                    )
                                })}
                            </div>

                        </div>
                    </section>
                ))}
            </section>
            <hr className='dark:text-[#3d3d3d] text-neutral-200'/>
        </main>
    )
}