import validator from 'validator'
import bcryptjs from'bcryptjs'
import {v2 as cloudinary} from 'cloudinary'
import counselorModel from '../models/counselorModel.js'
import jwt from 'jsonwebtoken'
import appointmentModel from '../models/appointmentModel.js'
import studentModel from '../models/studentModel.js'


//API for adding doctor
const addCounselor = async (req,res) =>{
   try{
    const{name,email,password,speciality,degree,experience,about,address} = req.body
    const imageFile = req.file

    // checking for all data to add counselor
    if(!name || !email || !password || !speciality || !degree || !experience || !about || !address ){
        return res.json({success:false,message:"Missing Details"})
    }
    // validating email format
    if (!validator.isEmail(email)){
        return res.json({success:false,message:"please enter a valid email"})
    }
    // validating strong password
    if(password.length <8){
        return res.json({success:false,message:"please enter a strong password"})

    }
    //hashing counselor password
    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password,salt)

    // upload image to cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"})
    const imageUrl = imageUpload.secure_url
    
    const counselorData ={
        name,
        email,
        image:imageUrl,
        password:hashedPassword,
        speciality,
        degree,
        experience,
        about,
        address:JSON.parse(address),
        date:Date.now()
    }
    const newCounselor = new counselorModel(counselorData)
    await newCounselor.save()

    res.json({succes:true,message:"Counselor Added"})

   }catch (error){
    console.log(error)
    res.json({success:false,message:error.message})

   } 
}
//API For admin Login
const loginAdmin = async(req,res) =>{
    try{
        const {email,password} = req.body

        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password,process.env.JWT_SECRET)
            res.json({success:true,token})
        }
        else{
            res.json({success:false,message:"Invalid credentials"})
        }

    }catch (error){
        console.log(error)
        res.json({success:false,message:error.
       message})

    }
}
// API to get all doctors list for admin panel
const allCounselors = async (req,res) =>{
    try{
        const counselors = await counselorModel.find({}).select('-password')
        res.json({success:true,counselors})

    } catch (error){
        console.log(error)
        res.json({success:false,message:error.
       message})

    }

}
//API to get all appointments list
const appointmentsAdmin = async(req,res) =>{
    try {
        const appointments = await appointmentModel.find({})
        res.json({success:true,appointments})
        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.
       message})
        
    }
}
//API for appointment cancellation
const appointmentCancel = async (req,res) =>{
    try {
      const {appointmentId} = req.body
  
      const appointmentData = await appointmentModel.findById(appointmentId)
  
      await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})
      // Releasing counselor slot
  
      const {counselorId,slotDate,slotTime} = appointmentData
  
      const counselorData = await counselorModel.findById(counselorId)
  
      let slots_booked = counselorData.slots_booked
  
      slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)
  
      await counselorModel.findByIdAndUpdate(counselorId,{slots_booked})
  
      res.json({success:true,message:'Appointment cancelled'})
      
    } catch (error) {
      console.log(error);
  res.json({ success: false, message: error.
  message });
      
    }
  
  }

// API to get dashboard data for admin panel
const adminDashboard = async(req,res) =>{
    try {
        const counselors = await counselorModel.find({})
        const students = await studentModel.find({})
        const appointments = await appointmentModel.find({})
        const dashData = {
            counselors:counselors.length,
            appointments:appointments.length,
            students:students.length,
            latestAppointments:appointments.reverse().slice(0,5)
        }
        res.json({success:true,dashData})
        
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.
        message });
        
    }
}
export {addCounselor,loginAdmin,allCounselors,appointmentsAdmin,appointmentCancel,adminDashboard}