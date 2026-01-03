import  express  from "express"
import cors from "cors"
import {config} from 'dotenv'
import routes from "../src/routers/index"

config()

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)

app.get('/health', (req,res) =>{
    res.json({status:'OK',message:'Server is running'})
})

export default app