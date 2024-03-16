import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoutes from './routes/user.route.js'

dotenv.config()
const app = express();

mongoose.connect(process.env.MONGO)
.then(()=>{console.log("DB is Connectected successfully!")})
.catch((err)=>{console.log(`Error in DB connection ${err}`)})

app.listen(3000,()=>{
    console.log('Server is running at port :3000')
})

app.use('/api/user/' , userRoutes)
