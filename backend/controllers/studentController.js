import validator from "validator";
import bcrypt from "bcrypt js";
import studentModel from "../models/studentModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import counselorModel from "../models/counselorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import { sendAppointmentConfirmation } from "../services/emailService.js"; // Import email service

//API to register student
const registerStudent = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !password || !email) {
            return res.json({ success: false, message: "Missing Details" });
        }
        //validating email format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "enter a valid email" });
        }
        //validating strong password
        if (password.length < 8) {
            return res.json({ success: false, message: "enter a strong password" });
        }
        //hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const studentData = {
            name,
            email,
            password: hashedPassword,
        };
        const newStudent = new studentModel(studentData);
        const student = await newStudent.save();

        const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET);
        res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

//API for student login
const loginStudent = async (req, res) => {
    try {
        const { email, password } = req.body;
        const student = await studentModel.findOne({ email });

        if (!student) {
            return res.json({ success: false, message: "User does not exist" });
        }
        const isMatch = await bcrypt.compare(password, student.password);
        if (isMatch) {
            const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET);
            res.json({ success: true, token });
        } else {
            res.json({ success: false, message: "Invalid credentials" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};
// API to get student profile data
const getProfile = async (req, res) => {
    try {
        const { studentId } = req.body;
        const studentData = await studentModel
            .findById(studentId)
            .select("-password");

        res.json({ success: true, studentData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};
//API to update user profile
const updateProfile = async (req, res) => {
    try {
        const { studentId, name, regno, address, dob, gender } = req.body;
        const imageFile = req.file;

        if (!name || !regno || !dob || !gender) {
            return res.json({ success: false, message: "Data Missing" });
        }

        await studentModel.findByIdAndUpdate(studentId, {
            name,
            regno,
            address: JSON.parse(address),
            dob,
            gender,
        });
        if (imageFile) {
            //upload image to cloudinary
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
                resource_type: "image",
            });
            const imageURL = imageUpload.secure_url;

            await studentModel.findByIdAndUpdate(studentId, { image: imageURL });
        }
        res.json({ success: true, message: "profile updated" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};
// API to book appointment
const bookAppointment = async (req, res) => {
    try {
        const { studentId, counselorId, slotDate, slotTime } = req.body;
        const counselorData = await counselorModel
            .findById(counselorId)
            .select("-password");
        if (!counselorData.available) {
            return res.json({ success: false, message: "Counselor not available" });
        }
        let slots_booked = counselorData.slots_booked;

        // checking for slot availability
        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({ success: false, message: "Slot not available" });
            } else {
                slots_booked[slotDate].push(slotTime);
            }
        } else {
            slots_booked[slotDate] = [];
            slots_booked[slotDate].push(slotTime);
        }
        const studentData = await studentModel
            .findById(studentId)
            .select("-password");

        delete counselorData.slots_booked;

        const appointmentData = {
            studentId,
            counselorId,
            studentData,
            counselorData,
            slotTime,
            slotDate,
            date: Date.now(),
        };
        const newAppointment = new appointmentModel(appointmentData);
        await newAppointment.save();

        // save new slots data in counselorData
        await counselorModel.findByIdAndUpdate(counselorId, { slots_booked });

        //Send email
        const studentEmail = studentData.email;
        const studentName = studentData.name;
        const counselorName = counselorData.name

        // Parse slotDate
        const dateParts = slotDate.split('_');
        const day = parseInt(dateParts[0], 10);
        const month = parseInt(dateParts[1], 10) - 1; // Months are 0-indexed in JavaScript Date
        const year = parseInt(dateParts[2], 10);

        const appointmentDate = new Date(year, month, day);

        const dayOfWeek = appointmentDate.toLocaleDateString('en-US', { weekday: 'long' }); // get the day of the week

        await sendAppointmentConfirmation(studentEmail, studentName, slotDate, slotTime, dayOfWeek,counselorName);

        res.json({ success: true, message: "Appointment Booked and email sent successfully!" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};
// API to get user appointments for frontend my-appointments page
const listAppointment = async (req, res) => {
    try {
        const { studentId } = req.body;
        const appointments = await appointmentModel.find({ studentId });
        res.json({ success: true, appointments });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};
//API to cancel appointment
const cancelAppointment = async (req, res) => {
    try {
        const { studentId, appointmentId } = req.body;

        const appointmentData = await appointmentModel.findById(appointmentId);

        //verify appointment student
        if (appointmentData.studentId !== studentId) {
            return res.json({ success: false, message: "unauthorized action" });
        }
        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });
        // Releasing counselor slot

        const { counselorId, slotDate, slotTime } = appointmentData;

        const counselorData = await counselorModel.findById(counselorId);

        let slots_booked = counselorData.slots_booked;

        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime);

        await counselorModel.findByIdAndUpdate(counselorId, { slots_booked });

        res.json({ success: true, message: 'Appointment cancelled' });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });

    }

}

export {
    registerStudent,
    loginStudent,
    getProfile,
    updateProfile,
    bookAppointment,
    listAppointment,
    cancelAppointment
};