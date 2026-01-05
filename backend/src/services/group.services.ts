import { AppDataSource } from "../data-source";
import { Group } from "../entities/Group";
import { User } from "../entities/User";


export class GroupService {

    private userRepo = AppDataSource.getRepository(User)
    private groupRepo = AppDataSource.getRepository(Group)

    async create(dataGroup: Group) {
        try {
            const { user, ...data } = dataGroup
            const userGroup = await this.userRepo.findOneBy({ id: user.id })

            if (!userGroup) throw new Error("Id do usuario não encontrado")

            const group = this.groupRepo.create({
                ...data,
                user: userGroup
            });
            return await this.groupRepo.save(group)
        } catch (e) {
            console.error("Error: " + e);

        }
    }

    async findAll() {
        try {
            const groups = this.groupRepo.find({ relations: ["user"] })
            return (await groups).map((u) => {
                const clone: any = { ...u };
                if (clone.user) {
                    delete clone.user.id
                    delete clone.user.password
                    delete clone.user.createdAt
                    delete clone.user.updatedAt
                }
                return clone
            })
        } catch (e) {
            console.error("Error: " + e);
        }
    }

    async update(id: number, data: Partial<Group>) {
        try {
            const group = await this.groupRepo.findOne({ where: { id } });
            if (!group) throw new Error("Grupo não encontrado");

            const { ...rest } = data

            Object.assign(group, rest)

            return await this.groupRepo.save(group)

        } catch (e) {
            console.error("Error: " + e);
        }
    }

    async delete(id: number) {
        try {
            const group = await this.groupRepo.findOne({ where: { id } })
            if (!group) throw new Error("Grupo não encontrado")

            await this.groupRepo.remove(group)

            return { message: "Grupo deletado" }
        } catch (e) {
            console.error("Error: " + e);
        }
    }

}