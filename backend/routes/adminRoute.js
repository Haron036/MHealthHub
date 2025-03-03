import express from 'express'
import { addCounselor,allCounselors,loginAdmin,appointmentsAdmin, appointmentCancel,adminDashboard } from '../controllers/adminController.js'
import upload from '../middlewares/multer.js'
import authAdmin from '../middlewares/authAdmin.js'
import { changeAvailability } from '../controllers/counselorController.js'

const adminRouter = express.Router()

adminRouter.post('/add-counselor',authAdmin,upload.single('image'),addCounselor)
adminRouter.post('/login',loginAdmin)
adminRouter.post('/all-counselors',authAdmin,allCounselors)
adminRouter.post('/change-availability',authAdmin,changeAvailability)
adminRouter.get('/appointments',authAdmin,appointmentsAdmin)
adminRouter.post('/cancel-appointment',authAdmin,appointmentCancel)
adminRouter.get('/dashboard',authAdmin,adminDashboard)
export default adminRouter