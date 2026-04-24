"use client"
import { useState } from "react"
import { useSnackbar } from "notistack"
import { registerUser } from "@/services/auth.service"
import { registerSchema } from "@/schemas/register.schema"
import { useRouter } from "next/navigation"
import { useAuth } from "@/app/context/useAuth"

export default function Page() {
    const [name, setName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { register } = useAuth();

    const { enqueueSnackbar } = useSnackbar()

    const handleRegister = async () => {
        try {

            const result = registerSchema.safeParse({
                name,
                lastName,
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

            await register(result.data)

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
        <div className="flex h-screen w-full flex-col md:flex-row">
            <div
                className="hidden md:flex md:w-1/2 bg-cover bg-center"
                style={{ backgroundImage: "url('/images/auth/tRegisImag.png')" }}
            />

            <div className="flex flex-1 items-center justify-center bg-gray-950 px-6">

                <div className="flex flex-col w-full max-w-md gap-5">

                    <div className="flex flex-col items-center text-center">
                        <h2 className="text-xl md:text-2xl text-white">
                            Crie sua conta no
                        </h2>
                        <h2 className="text-blue-400 text-3xl md:text-5xl font-bold">
                            Lembra-me
                        </h2>
                    </div>

                    <input
                        type="text"
                        placeholder="Nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="input-style"
                    />

                    <input
                        type="text"
                        placeholder="Sobrenome"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="input-style"
                    />

                    <input
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input-style"
                    />

                    <input
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input-style"
                    />

                    <button
                        onClick={handleRegister}
                        className="bg-violet-800 w-full py-2 rounded-md text-neutral-200 transition hover:bg-blue-950 hover:cursor-pointer"
                    >
                        Cadastrar
                    </button>

                    <p className="text-neutral-100 text-sm text-center">
                        Já tem uma conta?{" "}
                        <a
                            className="text-blue-300 hover:text-blue-800 transition"
                            href="/login"
                        >
                            Clique aqui
                        </a>
                    </p>

                </div>
            </div>
        </div>
    )
}
