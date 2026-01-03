import app from './app'
import { AppDataSource } from './data-source'

const PORT = process.env.PORT || 3306

AppDataSource.initialize()
    .then(() =>{
        app.listen(PORT, () =>console.log(`Server running in port: http://localhost:${PORT}`))
    })

    .catch(err => console.error('Error in database connection: ' , err))