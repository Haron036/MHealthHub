import mongoose from 'mongoose';
const counselorSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    image:{type:String,required:true},
    speciality:{type:String,required:true},
    degree:{type:String,required:true},
    experience:{type:String,required:true},
    about:{type:String,required:true},
    available:{type:Boolean,default:true},
    address:{type:Object,required:true},
    date:{type:Number,required:true},
    slots_booked:{type:Object,default:{}}


},{minimize:false})

const counselorModel= mongoose.models.counselor || mongoose.model('counselor',counselorSchema)

export default counselorModel
