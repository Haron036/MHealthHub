import express from 'express'
import { registerStudent,loginStudent, getProfile,updateProfile,bookAppointment,listAppointment,cancelAppointment } from '../controllers/studentController.js'
import authStudent from '../middlewares/authStudent.js'
import upload from '../middlewares/multer.js'

const studentRouter = express.Router()


studentRouter.post('/register',registerStudent)
studentRouter.post('/login',loginStudent)
studentRouter.get('/get-profile',authStudent,getProfile)
studentRouter.post('/update-profile',upload.single('image'),authStudent,updateProfile)
studentRouter.post('/book-appointment',authStudent,bookAppointment)
studentRouter.get('/appointments',authStudent,listAppointment)
studentRouter.post('/cancel-appointment',authStudent,cancelAppointment)



export default studentRouter