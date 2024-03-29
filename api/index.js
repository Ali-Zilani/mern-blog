import express from 'express'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'
import postRoutes from './routes/post.route.js'

dotenv.config()
const app = express();
app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGO)
.then(()=>{console.log("DB is Connectected successfully!")})
.catch((err)=>{console.log(`Error in DB connection : ${err}`)})  

app.listen(3000,()=>{
    console.log('Server is running at port :3000')
})

app.use('/api/user/', userRoutes)
app.use('/api/auth/', authRoutes)
app.use('/api/post/', postRoutes)

// middleware
app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500 ;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
}) 