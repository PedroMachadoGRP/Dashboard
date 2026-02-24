import  express  from "express"
import cors from "cors"
import {config} from 'dotenv'
import cookieParser from 'cookie-parser'
import routes from "../src/routers/index"

config()

const app = express()

app.use(cors({origin:"http://localhost:3000",credentials:true}))
app.use(express.json())
app.use(cookieParser())
app.use(routes)

app.get('/health', (req,res) =>{
    res.json({status:'OK',message:'Server is running'})
})


export default app