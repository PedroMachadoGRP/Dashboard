import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import bycrypt from 'bcrypt'

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