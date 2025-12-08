import app from './src/app.ts'
import {config} from 'dotenv'
config()

app.listen(process.env.PORT, ()=> {
    console.log("Server Is Running On Port " + process.env.PORT)
})