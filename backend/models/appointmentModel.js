/*import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    studentId:{type:String,required:true},
    counselorId:{type:String,required:true},
    slotDate:{type:String,required:true},
    slotTime:{type:String,required:true},
    studentData:{type:String,required:true},
    counselorData:{type:String,required:true},
    date:{type:Number,required:true},
    cancelled:{type:Boolean,default:false},
    isCompleted:{type:Boolean,default:false}
 
})
const appointmentModel = mongoose.models.appointment || mongoose.model('appointment',appointmentSchema)
export default appointmentModel*/

import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    studentId: { type: String, required: true },
    counselorId: { type: String, required: true },
    slotDate: { type: String, required: true },
    slotTime: { type: String, required: true },
    studentData: { 
        type: Object,  // Change from String to Object
        required: true 
    },
    counselorData: { 
        type: Object,  // Change from String to Object
        required: true 
    },
    date: { type: Number, required: true },
    cancelled: { type: Boolean, default: false },
    isCompleted: { type: Boolean, default: false }
});

const appointmentModel = mongoose.models.appointment || mongoose.model('appointment', appointmentSchema);
export default appointmentModel;
