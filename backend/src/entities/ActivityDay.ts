import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Activity } from "./Activity"



export enum ActivityDayEnum {
  SEGUNDA = "segunda",
  TERCA = "terça",
  QUARTA = "quarta",
  QUINTA = "quinta",
  SEXTA = "sexta",
  SABADO = "sabado",
  DOMINGO = "domingo",
}

@Entity("activity_day")
export class ActivityDay {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: "enum",
    enum: ActivityDayEnum,
  })
  day: ActivityDayEnum

  @ManyToOne(() => Activity, activity => activity.activityDay, {
    onDelete: "CASCADE",
  })
  activity: Activity
}