// import SideBar from "@/components/layout/sideBar";

// export default function Home() {
//   return (
//     <div className="dark:bg-blend-darken">
//         <SideBar/>
//     </div>
//   );
// }


"use client"

import ActivityGroupModal from "@/components/profile/activityGroupModal"
import axios from "axios"
import { use, useEffect, useState } from "react"

interface Group {
  id: number,
  title: string,
  description: string
}

interface PublicarMaterialDTO {
  title: string
  description: string
  user: {
    id: number
  }
}



export default function Page() {

  const [group, setGroup] = useState<Group[]>([])
  const [title, setTitle] = useState<string>("titulo")
  const [description, setDescription] = useState<string>("awdgbawhdvahwdgawygdauywdgajnsdjahwjkd wadnawjkdhawjdhnaw dawudhawuidhnajkdsnkajdhwa wadakuwdhakjwdaw")
  const [publi, setPubli] = useState<PublicarMaterialDTO>({
    title: "titulo",
    description: "descricao",
    user: { id: 1 } // ID do usuário logado
  })


  const publicar = async () => {
    try {
      const response = await axios.post('http://localhost:3333/groups/', publi)
      alert("funcionando")
      return response.data
    } catch (e) {
      console.log("Error: " + e);

    }
  }


  useEffect(() => {
    const showGroup = async () => {
      try {
        const response = await axios.get('http://localhost:3333/groups/')
        console.log('RESPOSTA DO BACKEND:', response.data);
        setGroup(response.data)


      } catch (e) {
        throw e
      }
    }

    showGroup()

  }, [])


  return (

    <div>
      {group.map((item, index) => (
        <ActivityGroupModal
          key={index}
          title={item.title}
          desc={item.description}
        />
      ))}

      <button className="bg-amber-600 w-20" onClick={publicar}>
        teste
      </button>
    </div>

  )

}