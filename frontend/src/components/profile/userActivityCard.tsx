
import { ActivityDay } from '@/services/activity.service'
import React from 'react'

export default function UserActivityCard(props: { title: string, days: ActivityDay[] }) {
  return (
    <div className='flex bg-white dark:bg-blue-950 text-black drop-shadow-black drop-shadow-xl/10 dark:drop-shadow-white h-40 w-55 rounded-2xl justify-center flex-col p-10 gap-0.5 '>
      <h2>Sua atividadde</h2>
      <h3>{props.title}</h3>
      <div className="flex gap-2 flex-wrap">
        {props.days.map(day => (
          <span
            key={day.id}
            className="bg-gray-200 px-2 rounded"
          >
            {day.day}
          </span>
        ))}
      </div>    </div>
  )
}
