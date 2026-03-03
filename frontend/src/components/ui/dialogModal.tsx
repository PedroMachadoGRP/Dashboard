"use client"

import * as React from "react"
import { Dialog } from "radix-ui"
import { Cross2Icon } from "@radix-ui/react-icons"
import WeekdaySelector from "./weekDaySelector"


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
  const [title, setTitle] = React.useState("")
  const [selectedDays, setSelectedDays] = React.useState<Weekday[]>([])
  const [open, setOpen] = React.useState(false)

  async function handleSubmit() {
    if (!title || selectedDays.length === 0) return

    await onCreate({ title, days: selectedDays })

    // resetar
    setTitle("")
    setSelectedDays([])
    setOpen(false)
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className="h-[35px] rounded bg-violet-500 px-4 text-white">
          Nova atividade
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-[2px]" />

        <Dialog.Content className="fixed left-1/2 top-1/2 w-[90vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-6 shadow-lg">

          <Dialog.Title className="text-lg font-semibold mb-4">
            Criar nova atividade
          </Dialog.Title>

          <div className="flex flex-col gap-4">

            <div>
              <label className="text-sm">Nome da atividade</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border rounded px-3 py-2 mt-1"
              />
            </div>

            <div>
              <label className="text-sm">Dias da semana</label>
              <WeekdaySelector
                selectedDays={selectedDays}
                onChange={setSelectedDays}
              />
            </div>

            <button
              onClick={handleSubmit}
              className="mt-4 bg-green-500 text-white py-2 rounded"
            >
              Criar
            </button>
          </div>

          <Dialog.Close asChild>
            <button className="absolute right-3 top-3">
              <Cross2Icon />
            </button>
          </Dialog.Close>

        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}