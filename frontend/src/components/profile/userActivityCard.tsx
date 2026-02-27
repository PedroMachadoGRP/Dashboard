
import { ActivityDay } from '@/services/activity.service'
import React from 'react'

export default function UserActivityCard(props: { title: string, days: ActivityDay[] }) {
  return (
    <div className='flex bg-white dark:bg-blue-950 text-black drop-shadow-black drop-shadow-xl/7 dark:drop-shadow-white dark:text-zinc-200 h-45 w-109 rounded-2xl justify-center flex-col p-10 gap-0.5 '>
      <h3 className='text-2xl'>{props.title}</h3>
      <hr className='text-gray-100 dark:text-gray-900' />


      <div className='flex flex-col items-start'>
        <h3>Dias da semana</h3>
        <div className="flex flex-wrap gap-2 mt-2">
          {props.days.map(day => (
            <span
              key={day.id}
              className="bg-gray-100 dark:bg-blue-800 px-3 py-1 rounded-lg text-sm"
            >
              {day.day}
            </span>
          ))}
        </div>
      </div>

    </div>
  )
}
