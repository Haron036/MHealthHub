import express from 'express'
import { counselorList,loginCounselor,appointmentsCounselor,appointmentComplete,appointmentCancel,counselorDashboard ,counselorProfile,updateCounselorProfile} from '../controllers/counselorController.js'
import authCounselor from '../middlewares/authCounselor.js';

const counselorRouter = express.Router();

counselorRouter.get('/list',counselorList)
counselorRouter.post('/login',loginCounselor)
counselorRouter.get('/appointments',authCounselor,appointmentsCounselor)
counselorRouter.post('/complete-appointment',authCounselor,appointmentComplete)
counselorRouter.post('/cancel-appointment',authCounselor,appointmentCancel)
counselorRouter.get('/dashboard',authCounselor,counselorDashboard)
counselorRouter.get('/profile',authCounselor,counselorProfile)
counselorRouter.post('/update-profile',authCounselor,updateCounselorProfile)



export default counselorRouter