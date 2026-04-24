"use client"

import * as React from "react"
import { Dialog } from "radix-ui"
import { Cross2Icon } from "@radix-ui/react-icons"
import WeekdaySelector from "./weekDaySelector"
import { useState } from "react"


export type Weekday =
  | "SEGUNDA"
  | "TERCA"
  | "QUARTA"
  | "QUINTA"
  | "SEXTA"
  | "SABADO"
  | "DOMINGO"

type DialogModalProps = {
  onCreate: (data: { title: string; days: Weekday[] }) => Promise<void>
}

export function DialogModal({ onCreate }: DialogModalProps) {
  const [title, setTitle] = useState("")
  const [selectedDays, setSelectedDays] = useState<Weekday[]>([])
  const [open, setOpen] = useState(false)

  async function handleSubmit() {
    if (!title || selectedDays.length === 0) return

    await onCreate({ title, days: selectedDays })

    setTitle("")
    setSelectedDays([])
    setOpen(false)
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className="h-[40px] rounded-md border border-green-400 dark:border-violet-700 px-4 text-sm md:text-base text-neutral-700 dark:text-neutral-100 hover:bg-green-300 hover:cursor-pointer dark:hover:bg-violet-700 transition">
          Nova atividade
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
  {/* Overlay */}
  <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm" />

  {/* Modal */}
  <Dialog.Content
    className="
      fixed z-50

      /* MOBILE (bottom sheet) */
      bottom-0 left-0 right-0
      w-full
      max-h-[85vh]
      rounded-t-2xl
      p-4

      /* DESKTOP (centralizado) */
      md:top-1/2 md:left-1/2
      md:bottom-auto md:right-auto
      md:w-[90vw] md:max-w-lg
      md:max-h-[90vh]
      md:-translate-x-1/2 md:-translate-y-1/2
      md:rounded-xl md:p-6

      overflow-y-auto

      bg-neutral-50 dark:bg-[#141414]
      text-neutral-700 dark:text-neutral-100
      shadow-xl
    "
  >

    {/* Barra de arrastar (UX mobile) */}
    <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-gray-300 md:hidden" />

    {/* Título */}
    <Dialog.Title className="text-base md:text-lg font-semibold mb-4">
      Criar nova atividade
    </Dialog.Title>

    <div className="flex flex-col gap-4">

      {/* Nome */}
      <div>
        <label className="text-sm md:text-base">
          Nome da atividade
        </label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={50}
          className="
            w-full mt-1
            border rounded-md
            px-3 py-2
            text-sm md:text-base
            outline-none
            focus:border-blue-500
          "
        />
      </div>

      {/* Dias */}
      <div className="flex flex-col gap-2">
        <label className="text-sm md:text-base">
          Dias da semana
        </label>
        <WeekdaySelector
          selectedDays={selectedDays}
          onChange={setSelectedDays}
        />
      </div>

      {/* Botão */}
      <button
        onClick={handleSubmit}
        className="
          mt-2 w-full
          bg-green-500 dark:bg-blue-900
          text-white py-2 rounded-md
          text-sm md:text-base
          hover:bg-blue-400 dark:hover:bg-purple-950
          transition
        "
      >
        Criar
      </button>
    </div>

    {/* Fechar */}
    <Dialog.Close asChild>
      <button
        className="
          absolute right-3 top-3
          p-2 rounded-md
          hover:bg-black/10 dark:hover:bg-white/10
          transition
        "
      >
        <Cross2Icon />
      </button>
    </Dialog.Close>

  </Dialog.Content>
</Dialog.Portal>
    </Dialog.Root>
  )
}