import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import counselorRouter from './routes/counselorRoute.js'
import studentRouter from './routes/studentRoute.js'

//app config
const app = express()
const port = process.env.PORT || 4000;
connectDB()
connectCloudinary()

//middlewares
app.use(express.json())
app.use(cors())

//api endpoints
app.use('/api/admin',adminRouter)
app.use('/api/counselor',counselorRouter)
app.use('/api/student',studentRouter)


app.get('/',(req,res)=>{
    res.send('API WORKING ')
})
app.listen(port, ()=> console.log(' Server Started',port))