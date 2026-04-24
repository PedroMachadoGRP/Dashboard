"use client"

import { useAuth } from "@/app/context/useAuth"
import { useSnackbar } from "notistack"
import { useState } from "react"

export default function Page() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const { enqueueSnackbar } = useSnackbar()
  const { login } = useAuth()


  const handleLogin = async () => {

    try {

      await login(email, password)

      enqueueSnackbar("Login realizado com sucesso", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });

    } catch (error: any) {
      const message =
        error?.response?.data?.message

      enqueueSnackbar(message, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });

      console.error(error);
    }
  }

  return (
    <div className="flex h-screen w-full flex-col md:flex-row">

      <div className="flex flex-1 items-center justify-center bg-gray-950 px-6">

        <div className="flex flex-col w-full max-w-md gap-5">

          <div className="flex flex-col items-center text-center">
            <h2 className="text-xl md:text-2xl text-white">
              Bem-vindo ao
            </h2>
            <h2 className="text-blue-400 text-3xl md:text-5xl font-bold">
              Lembra-me
            </h2>
          </div>

          <input
            type="text"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="input-style"
          />

          <input
            type="password"
            value={password}
            placeholder="Senha"
            onChange={(e) => setPassword(e.target.value)}
            className="input-style"
          />

          <button
            onClick={handleLogin}
            className="bg-violet-800 w-full py-2 rounded-md text-neutral-200 transition hover:bg-blue-950 hover:cursor-pointer"
          >
            Entrar
          </button>

          <p className="text-neutral-100 text-sm text-center">
            Não tem uma conta?{" "}
            <a
              className="text-blue-300 hover:text-blue-800 transition"
              href="/register"
            >
              Clique aqui
            </a>
          </p>

        </div>
      </div>

      <div
        className="hidden md:flex md:w-1/2 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/auth/tLoginImag.png')" }}
      />

    </div>

  )
}
