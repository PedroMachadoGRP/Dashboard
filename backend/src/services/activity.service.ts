import { AppDataSource } from "../data-source";
import { Activity } from "../entities/Activity";
import { User } from "../entities/User";


export class ActivityService {
    private userRepo = AppDataSource.getRepository(User)
    private activityRepo = AppDataSource.getRepository(Activity)

async create(dataActivity: Activity) {
  try {
    const { user, activityDay, ...data } = dataActivity

    const userActivity = await this.userRepo.findOneBy({
      id: user.id
    })

    if (!userActivity) throw new Error("Usuário não encontrado")

    const activity = this.activityRepo.create({
      ...data,
      user: userActivity,
      activityDay: activityDay ?? [] 
    })

    return await this.activityRepo.save(activity)

  } catch (e) {
    console.error("Erro:", e)
    throw e
  }
}


    async findAll() {
    try {
        const activitys = await this.activityRepo.find({
            relations: ["user", "activityDay"]
        })

        return activitys.map((u) => {
            const clone: any = { ...u }

            if (clone.user) {
                delete clone.user.password
            }

            return clone
        })
    } catch (e) {
        console.error("Erro:", e)
        throw e
    }
}

    async update(id:number, data:Partial<Activity>){
        try {
            const activity = await this.activityRepo.findOne({where:{id}});
            if(!activity) throw new Error("Atividade não encontrada")

            const {...rest} = data

            Object.assign(activity,rest)

            return await this.activityRepo.save(activity)
        } catch (e) {
            console.error("Error: " ,e);
            throw e
        }
    }

    async delete(id:number) {
        try {
            const activity = await this.activityRepo.findOne({where: {id}})
            if(!activity) throw new Error("Atividade não encontrada")
            
            await this.activityRepo.remove(activity)
        } catch (e) {
            console.error("Error: " , e);
            throw e
            
        }
    }
}