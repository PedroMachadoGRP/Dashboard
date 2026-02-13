import { config } from 'dotenv'
import {DataSource} from 'typeorm'
import {User} from './entities/User'
import 'reflect-metadata'
import { Group } from './entities/Group'


config()

export const AppDataSource = new DataSource({
    type:'mysql',
    host: process.env.DB_HOST,
    port:Number(process.env.DB_PORT) || 3306,
    username: process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
    entities:[User,Group],
    synchronize:true,
    logging:false,
})