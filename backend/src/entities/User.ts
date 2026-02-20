import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import bycrypt from 'bcrypt'
import { Activity } from "./Activity";

@Entity('user')
export class User {

    @PrimaryGeneratedColumn()
    id:number

    @Column({length:300})
    name:string

    @Column({unique:true, length:300})
    email:string

    @Column()
    password:string

    @OneToMany(() => Activity, (Activity) => Activity.user,{
        onDelete:"CASCADE"
    })
    activity:Activity[];

    @CreateDateColumn()
    createdAt:Date
    
    @UpdateDateColumn()
    updatedAt:Date
    
    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        if (!this.password.startsWith('$2')) {
            const rounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10', 10);
            this.password = await bycrypt.hash(this.password, rounds);
        }
    }

    async validatePassword(plain: string): Promise<boolean> {
        return bycrypt.compare(plain, this.password)
    }
}