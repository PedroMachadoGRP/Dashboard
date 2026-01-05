import { AppDataSource } from "../data-source";
import { User } from "../entities/User";


export class UserService {

    private userRepo = AppDataSource.getRepository(User)

    async create(data: User) {
        try {
            const emailExist = await this.userRepo.findOne({
                where: { email: data.email },
            })

            if (emailExist) throw new Error("Email alredy registered")

            const user = await this.userRepo.create(data)
            return await this.userRepo.save(user)

        } catch (e) {
            console.log("Error: " + e);
        }
    }

    async findAll() {
        try {
            const users = this.userRepo.find({relations:["group"]})

            return (await users).map((u) => {
                const clone: any = { ...u };
                delete clone.password;


                return clone
            })
        } catch (e) {
            console.log("Error: " + e);
        }

    }

    async findById(id: number) {
        try {
            const user = await this.userRepo.findOne({ where: { id },relations:["group"] })

            if (!user) throw new Error("User not found")

            const clone: any = { ...user }

            delete clone.password

            return clone

        } catch (e) {
            console.log("Error: " + e);
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
        } catch (e) {
            console.log("Error: " + e);
        }
    }

    async remove(id: number) {
        try {
            const user = await this.userRepo.findOne({ where: { id } })

            if (!user) throw new Error("User not found")

            await this.userRepo.remove(user)

            return { message: "User deleted" }
        } catch (e) {
            console.log("Error: " + e);
        }
    }
     async findEmail(email: string) {
    try {
      const user = await this.userRepo.findOne({ where: { email } });

      if (!user) throw new Error("User not found");

      return user;
    } catch (e) {
      console.log("Erroe:" + e);
    }
  }
}