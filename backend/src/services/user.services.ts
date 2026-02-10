import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import { AppError } from "../errors/AppError";


export class UserService {

    private userRepo = AppDataSource.getRepository(User)

    async create(data: User) {
        try {
            const emailExist = await this.userRepo.findOne({
                where: { email: data.email },
            })

            if (emailExist) throw new AppError("Email já registrado",409)

            const user = await this.userRepo.create(data)
            return await this.userRepo.save(user)

        } catch (e: any) {
            console.log("Error:" + e);
            throw e
        }
    }

    async findAll() {
        try {
            const users = this.userRepo.find({ relations: ["group"] })

            return (await users).map((u) => {
                const clone: any = { ...u };
                delete clone.password;


                return clone
            })
        } catch (e: any) {
            console.log("Error:" + e);
            throw e
        }

    }

    async findById(id: number) {
        try {
            const user = await this.userRepo.findOne({ where: { id }, relations: ["group"] })

            if (!user) throw new Error("User not found")

            const clone: any = { ...user }

            delete clone.password

            return clone

        } catch (e: any) {
            console.log("Error:" + e);
            throw e
        }
    }

    async update(id: number, data: Partial<User>) {
        try {
            const user = await this.userRepo.findOne({ where: { id } })

            if (!user) throw new Error("User not found")

            if (data.password) {
                user.password = data.password
            }

            const { password, ...rest } = data

            Object.assign(user, rest)

            return await this.userRepo.save(user)
        } catch (e: any) {
            console.log("Error:" + e);
            throw e
        }
    }

    async remove(id: number) {
        try {
            const user = await this.userRepo.findOne({ where: { id } })

            if (!user) throw new Error("User not found")

            await this.userRepo.remove(user)

            return { message: "User deleted" }
        } catch (e: any) {
            console.log("Error:" + e);
            throw e

        }
    }
    async findEmail(email: string) {
        try {
            const user = await this.userRepo.findOne({ where: { email } });

            if (!user) throw new Error("User not found");

            return user;
        } catch (e: any) {
            console.log("Error:" + e);
            throw e
        }
    }
}