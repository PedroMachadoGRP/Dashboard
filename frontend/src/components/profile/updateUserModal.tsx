"use client"

import * as React from "react"
import { Dialog } from "radix-ui"
import { Cross2Icon } from "@radix-ui/react-icons"
import { useState } from "react"
import { useAuth } from "@/app/context/useAuth"


export type UpdatedUser = Partial<{
  name: string;
  lastName: string;
  email: string;
  password: string
}>

type UpdateUserModalProps = {
  onCreate: (data: UpdatedUser) => Promise<void>
}

export function UpdateUserModal({ onCreate }: UpdateUserModalProps) {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [open, setOpen] = useState(false)

  async function handleSubmit() {
    const data: UpdatedUser = {}

    if (name.trim()) data.name = name;
    if (lastName.trim()) data.lastName = lastName;
    if (email.trim()) data.email = email;
    if (password.trim()) data.password = password

    if (Object.keys(data).length === 0) return


    await onCreate(data)

    setName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setOpen(false)
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className="
                w-full sm:w-auto
                h-10 px-4
                rounded-md
                border border-[#3A9AFF]
                 text-neutral-700 dark:text-[#2667ac]
                hover:bg-[#3A9AFF] hover:text-neutral-100
                dark:border-[#2667ac] dark:hover:bg-[#2667ac]
                hover:cursor-pointer
                duration-350
                transition">
          Atualizar
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm" />

        <Dialog.Content
          className="
      fixed z-50

      bottom-0 left-0 right-0
      w-full
      max-h-[90vh]
      rounded-t-2xl
      p-4

      md:top-1/2 md:left-1/2
      md:bottom-auto md:right-auto
      md:w-[90vw] md:max-w-2xl
      md:-translate-x-1/2 md:-translate-y-1/2
      md:rounded-xl md:p-6

      overflow-y-auto

      bg-neutral-50 dark:bg-[#141414]
      text-neutral-700 dark:text-neutral-100
      shadow-xl">
          <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-gray-300 md:hidden" />

          <Dialog.Title className="text-base md:text-lg font-semibold mb-4">
            Atualizar Usuário
          </Dialog.Title>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>
              <label className="text-sm md:text-base">Nome</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full mt-1 border rounded-md px-3 py-2 text-sm md:text-base"
              />
            </div>

            <div>
              <label className="text-sm md:text-base">Sobrenome</label>
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full mt-1 border rounded-md px-3 py-2 text-sm md:text-base"
              />
            </div>

            <div>
              <label className="text-sm md:text-base">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 border rounded-md px-3 py-2 text-sm md:text-base"
              />
            </div>

            <div>
              <label className="text-sm md:text-base">Senha</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                className="w-full mt-1 border rounded-md px-3 py-2 text-sm md:text-base"
              />
            </div>

          </div>

          <div className="mt-5">
            <button
              onClick={handleSubmit}
              className="
          w-full
          bg-green-500 dark:bg-blue-900
          text-white
          py-2 rounded-md
          text-sm md:text-base
          hover:bg-blue-400 dark:hover:bg-purple-950
          transition
        "
            >
              Atualizar
            </button>
          </div>

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