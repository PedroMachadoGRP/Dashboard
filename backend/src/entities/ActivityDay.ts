import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Activity } from "./Activity"



export enum ActivityDayEnum {
  MONDAY = "monday",
  TUESDAY = "tuesday",
  WEDNESDAY = "wednesday",
  THURSDAY = "thursday",
  FRIDAY = "friday",
  SATURDAY = "saturday",
  SUNDAY = "sunday",
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

  @ManyToOne(() => Activity, activity => activity.days, {
    onDelete: "CASCADE",
  })
  activity: Activity
}