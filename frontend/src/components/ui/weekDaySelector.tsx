"use client"

import React from "react"

type Weekday =
  | "SEGUNDA"
  | "TERCA"
  | "QUARTA"
  | "QUINTA"
  | "SEXTA"
  | "SABADO"
  | "DOMINGO"

type WeekdaySelectorProps = {
  selectedDays: Weekday[]
  onChange: (days: Weekday[]) => void
}

const weekDays: { label: string; value: Weekday }[] = [
  { label: "Seg", value: "SEGUNDA" },
  { label: "Ter", value: "TERCA" },
  { label: "Qua", value: "QUARTA" },
  { label: "Qui", value: "QUINTA" },
  { label: "Sex", value: "SEXTA" },
  { label: "Sáb", value: "SABADO" },
  { label: "Dom", value: "DOMINGO" },
]

export default function WeekdaySelector({
  selectedDays,
  onChange,
}: WeekdaySelectorProps) {

  function toggleDay(value: Weekday) {
    if (selectedDays.includes(value)) {
      onChange(selectedDays.filter(d => d !== value))
    } else {
      onChange([...selectedDays, value])
    }
  }

  return (
    <div className="flex gap-2 flex-wrap">
      {weekDays.map(day => {
        const isSelected = selectedDays.includes(day.value)

        return (
          <label key={day.value} className="cursor-pointer">
            <input
              type="checkbox"
              className="hidden"
              checked={isSelected}
              onChange={() => toggleDay(day.value)}
            />

            <span
              className={`
                px-4 py-2 rounded-lg border text-sm transition-all duration-200 active:scale-95
                ${isSelected
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-black border-gray-300 hover:bg-gray-100"}
              `}
            >
              {day.label}
            </span>
          </label>
        )
      })}
    </div>
  )
}