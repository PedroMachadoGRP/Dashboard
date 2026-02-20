import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { ActivityDay } from "./ActivityDay";

@Entity('activity')
export class Activity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 300 })
    title: string

    @OneToMany(() => ActivityDay, day => day.activity, {
        cascade: true,
    })
    days: ActivityDay[]

    @ManyToOne(() => User, (user) => user.activity, {
        cascade: true,
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "user_id" })
    user: User



}