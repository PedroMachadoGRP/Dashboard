
'use client'

import { useAuth } from "@/app/context/useAuth"
import { me } from "@/services/auth.service"
import { useEffect, useState } from "react"
import UserActivityCard from "@/components/profile/userActivityCard"
import { UserService } from "@/services/user.service"
import { Activity, ActivityService } from "@/services/activity.service"
import ProfileField from "@/components/profile/profileField"
import ProfilePasswordField from "@/components/profile/profilePasswordField"
import { UpdatedUser, UpdateUserModal } from "@/components/profile/updateUserModal"
import { useSnackbar } from "notistack"
import { useRouter } from "next/navigation"

interface User {
  id: number
  name: string
  lastName: string
  email: string
}



export default function Page() {
  const [user, setUser] = useState<User | null>(null)
  const { enqueueSnackbar } = useSnackbar()
  const router = useRouter()
  const { userId, } = useAuth()


  const handleUpdate = async (data: UpdatedUser) => {
    try {
      const updateUser = await UserService.update(Number(userId), data)
      setUser(updateUser)

      enqueueSnackbar("Usuário Atualizado com sucesso!", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });

    } catch (error: any) {
      console.error(error);

      const message =
        error?.response?.data?.message ||
        "Erro ao Atualizar usuário";

      enqueueSnackbar(message, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });

    }
  }

  const handleDelete = async () => {

    try {

      enqueueSnackbar("Usuário Atualizado com sucesso!", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });

      const deleteUser = await UserService.delete(Number(userId))
      router.refresh()
      return deleteUser
    } catch (error: any) {
      console.error(error);

      const message =
        error?.response?.data?.message ||
        "Erro ao deletar usuário";

      enqueueSnackbar(message, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });

    }
  }

  useEffect(() => {

    async function loadUser() {
      try {
        const data = await me()
        setUser(data)

      } catch {
        setUser(null)
      }
    }
    loadUser()
  }, [])


  return (
 <div className="flex justify-center items-start min-h-screen p-4 md:p-8">

      <div
        className="
          w-full max-w-3xl
          flex flex-col gap-6
          p-4 md:p-6
          rounded-xl
          bg-neutral-50 dark:bg-[#141414]
          text-neutral-700 dark:text-neutral-100
          shadow-lg
        ">

        <header>
          <h2 className="text-xl md:text-2xl font-semibold">
            Seu perfil
          </h2>
        </header>

        <main className="flex flex-col gap-4">

          <div>
            <h3 className="text-lg md:text-xl font-medium">
              Suas informações
            </h3>
            <hr className="mt-1 border-gray-200 dark:border-gray-700" />
          </div>

          <section
            className="
              grid gap-4
              grid-cols-1
              sm:grid-cols-2
            ">

            <ProfileField title="Nome" info={user?.name} />
            <ProfileField title="Sobrenome" info={user?.lastName} />
            <ProfileField title="Email" info={user?.email} />
            <ProfilePasswordField title="Senha" />

          </section>

          <div
            className="
              flex flex-col sm:flex-row
              gap-3
              md:justify-start
              sm:justify-between
            "
          >
            <UpdateUserModal onCreate={handleUpdate} />

            <button
              onClick={handleDelete}
              className="
                w-full sm:w-auto
                h-10 px-4
                rounded-md
                border border-red-400
                text-red-500
                hover:bg-red-400 hover:text-white
                dark:border-red-900 dark:hover:bg-red-900
                hover:cursor-pointer
                duration-350
                transition
              "
            >
              Deletar conta
            </button>
          </div>

        </main>
      </div>
    </div>

  )

}