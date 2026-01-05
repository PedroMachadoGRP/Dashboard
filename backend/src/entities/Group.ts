import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity('group')

export class Group{

    @PrimaryGeneratedColumn()
    id:number

    @Column({length:100})
    title:string

    @Column({length:300})
    description:string

    @ManyToOne(() => User,(user) => user.group,{
        cascade:true,
        onDelete:"CASCADE"
    })
    @JoinColumn({name:'user_id'})
    user:User

}