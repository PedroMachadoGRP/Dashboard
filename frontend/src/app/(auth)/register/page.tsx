"use client"
import { useState } from "react"
import axios from "axios"
import { useSnackbar } from "notistack"
import { registerUser } from "@/services/auth.service"
import { ZodError } from "zod"
import { registerSchema } from "@/schemas/register.schema"

export default function Page() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { enqueueSnackbar } = useSnackbar()

    const handleRegister = async () => {
        try {

            const result = registerSchema.safeParse({
                name,
                email,
                password,
            });

            if (!result.success) {

                const firstError = result.error.issues[0];

                enqueueSnackbar(firstError.message, {
                    variant: "error",
                    anchorOrigin: {
                        vertical: "top",
                        horizontal: "right",
                    },
                });

                return;
            }

            await registerUser(result.data);

            enqueueSnackbar("Usuário cadastrado com sucesso!", {
                variant: "success",
                anchorOrigin: {
                    vertical: "top",
                    horizontal: "right",
                },
            });

        } catch (error: any) {

            const message =
                error?.response?.data?.message ||
                "Erro ao cadastrar";

            enqueueSnackbar(message, {
                variant: "error",
                anchorOrigin: {
                    vertical: "top",
                    horizontal: "right",
                },
            });

            console.error(error);
        }
    };



    return (
        <div className="flex h-screen w-full ">

            <div className="hidden md:flex flex-1 items-start justify-center p-10 bg-cover bg-center" style={{ backgroundImage: "url('/images/auth/tRegisImag.png')", }} >
            </div>

            <div className="flex flex-1 justify-center flex-col bg-gray-950 gap-20 ">

                <div className="flex flex-col  w-95 gap-5 justify-center self-center ">
                    <div className="flex flex-col justify-center items-center m-4">
                        <h2 className="text-center text-2xl text-white">
                            Crie sua conta no
                        </h2>
                        <h2 className="text-blue-400 text-5xl">Lembra-me</h2>
                    </div>

                    <input type="text" placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} className="shadow-xl/20 shadow-violet-900 border border-indigo-700 outline-none rounded-[6] p-1 bg-gray-700  text-neutral-100 transition delay-50 duration-300 ease-in focus:border-2 focus:border-indigo-400 focus:scale-101   " />
                    <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="shadow-xl/20 shadow-violet-900 border border-indigo-700 outline-none rounded-[6] p-1 bg-gray-700 text-neutral-100 transition delay-50 duration-300 ease-in focus:border-2 focus:border-indigo-400 focus:scale-101" />
                    <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} className="shadow-xl/20 shadow-violet-900 border border-indigo-700 outline-none rounded-[6] p-1 bg-gray-700 text-neutral-100 transition delay-50 duration-300 ease-in focus:border-2 focus:border-indigo-400 focus:scale-101" />

                    <button onClick={handleRegister} className="m-1 bg-violet-800 w-95 p-1 rounded-[6] self-center text-neutral-200 transition delay-50 duration-300 ease-in-out hover:bg-blue-950 cursor-pointer" >
                        Cadastrar
                    </button>
                    <p className="text-neutral-100">Já tem uma conta? <a className="text-blue-300 transition delay-75 duration-300 ease-in-out hover:text-blue-800" href="/login">Clique aqui</a> </p>

                </div>


            </div>

        </div>

    )
}
