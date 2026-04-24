
import { ActivityDay } from '@/services/activity.service'
import React from 'react'

export default function UserActivityCard(props: { title: string, days: ActivityDay[] }) {
  return (
  <div
      className="
        w-full max-w-md
        flex flex-col gap-1
        p-4 md:p-5
        rounded-xl

        bg-linear-to-r from-gray-100 to-white
        dark:from-blue-900 dark:to-indigo-700
        text-gray-700 dark:text-zinc-200

        shadow-md hover:shadow-lg
        transition">

      <h3 className="text-lg md:text-xl font-semibold wrap-break-word">
        {props.title}
      </h3>

      <hr className="border-gray-200 dark:border-gray-800" />

      <div className="flex flex-col gap-2">
        <h4 className="text-sm md:text-base font-medium">
          Dias da semana
        </h4>

        <div className="flex flex-wrap gap-2">
          {props.days.map(day => (
            <span
              key={day.id}
              className="
                text-xs md:text-sm
                bg-gray-200 dark:bg-sky-600
                px-2 md:px-3 py-1
                rounded-md
                whitespace-nowrap ">
              {day.day}
            </span>
          ))}
        </div>
      </div>

    </div>
  )
}
