"use client"

import { useAuth } from "@/app/context/useAuth"
import { loginUser } from "@/services/auth.service"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useSnackbar } from "notistack"
import { useState } from "react"

export default function Page() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const { login } = useAuth()


  const handleLogin = async () => {

    try {
      const data = await loginUser({
        email,
        password
      })

      localStorage.setItem("token", data.token)

      login(String(data.user.id))
      router.push('/home')

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
    <div className="flex h-screen w-full ">

      <div className="flex flex-1 justify-center flex-col bg-gray-950 gap-20 ">

        <div className="flex flex-col  w-95 gap-5 justify-center self-center ">
          <div className="flex flex-col justify-center items-center m-4">
            <h2 className="text-center text-2xl text-white">
              Bem vindo  ao
            </h2>
            <h2 className="text-blue-400 text-5xl">Lembra-me</h2>
          </div>


          <input type="text" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} className="shadow-xl/20 shadow-violet-900 border border-indigo-700 outline-none rounded-[6] p-1 bg-gray-700 text-neutral-100 transition delay-50 duration-300 ease-in focus:border-2 focus:border-indigo-400 focus:scale-101" />
          <input type="password" value={password} placeholder="Senha" onChange={(e) => setPassword(e.target.value)} className="shadow-xl/20 shadow-violet-900 border border-indigo-700 outline-none rounded-[6] p-1 bg-gray-700 text-neutral-100 transition delay-50 duration-300 ease-in focus:border-2 focus:border-indigo-400 focus:scale-101" />

          <button onClick={handleLogin} className="m-1 bg-violet-800 w-95 p-1 rounded-[6] self-center text-neutral-200 transition delay-50 duration-300 ease-in-out hover:bg-blue-950 cursor-pointer">
            Entrar
          </button>

          <p className="text-neutral-100">Não tem uma conta? <a className="text-blue-300 transition delay-75 duration-300 ease-in-out hover:text-blue-800" href="/register">Clique aqui</a> </p>

        </div>


      </div>

      <div className="hidden md:flex flex-1 items-end justify-center p-10 bg-cover bg-center" style={{ backgroundImage: "url('/images/auth/tLoginImag.png')", }} >
      </div>


    </div>

  )
}
