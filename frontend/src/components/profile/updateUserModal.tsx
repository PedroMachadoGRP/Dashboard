"use client"

import * as React from "react"
import { Dialog } from "radix-ui"
import { Cross2Icon } from "@radix-ui/react-icons"
import { useState } from "react"
import { useAuth } from "@/app/context/useAuth"


export type UpdatedUser = Partial <{
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
    const data :UpdatedUser = {}

    if(name.trim()) data.name = name;
    if(lastName.trim()) data.lastName = lastName;
    if(email.trim()) data.email = email;
    if(password.trim()) data.password = password

    if(Object.keys(data).length === 0) return


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
        <button className="w-50 h-10 rounded border border-[#3A9AFF] text-neutral-700 dark:text-neutral-100  px-4 hover:bg-[#3A9AFF] hover:text-neutral-100 transition duration-300  hover:cursor-pointer">
          Atualizar
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-[2px]" />

        <Dialog.Content className="fixed left-1/2 top-1/2 w-[90vw] max-w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-neutral-50 dark:bg-[#141414] text-neutral-700 dark:text-neutral-100 p-6 shadow-lg">

          <Dialog.Title className="text-lg font-semibold mb-4 ">
            Atualizar Usuário
          </Dialog.Title>
          
          <div className="grid grid-cols-2 gap-4">

            <div>
              <label className="text-lg">Nome</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border rounded px-3 py-2 mt-1"
              />
            </div>

            <div>
              <label className="text-lg">Sobrenome</label>
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full border rounded px-3 py-2 mt-1"
              />
            </div>

            <div>
              <label className="text-lg">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded px-3 py-2 mt-1"
              />
            </div>

            <div>
              <label className="text-lg">Senha</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="Nova senha"
                className="w-full border rounded px-3 py-2 mt-1"
              />
            </div>
    
            <button
              onClick={handleSubmit}
              className="fmt-4 bg-green-500 dark:bg-blue-900 text-white py-2 rounded hover:cursor-pointer hover:bg-blue-400 dark:hover:bg-purple-950 transition-all duration-300   "
            >
              Atualizar
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