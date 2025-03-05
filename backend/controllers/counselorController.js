import jwt from "jsonwebtoken"; // ✅ Correct
import counselorModel from "../models/counselorModel.js";
import bcryptjs from "bcryptjs";
import appointmentModel from "../models/appointmentModel.js";

const changeAvailability = async (req, res) => {
  try {
    const { counselorId } = req.body;

    const counselorData = await counselorModel.findById(counselorId);
    await counselorModel.findByIdAndUpdate(counselorId, {
      available: !counselorData.available,
    });
    res.json({ success: true, message: "Availability Changed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
const counselorList = async (req, res) => {
  try {
    const counselors = await counselorModel
      .find({})
      .select(["-password", "-email"]);
    res.json({ success: true, counselors });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
//API for counselor Login
const loginCounselor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const counselor = await counselorModel.findOne({ email });
    if (!counselor) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcryptjs.compare(password, counselor.password);

    if (isMatch) {
      const token = jwt.sign({ id: counselor._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API to get counselor appointments for counselor panel
const appointmentsCounselor = async (req, res) => {
  try {
    const { counselorId } = req.body;
    const appointments = await appointmentModel.find({ counselorId });

    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
//API to mark appointment completed for counselor panel
const appointmentComplete = async (req, res) => {
  try {
    const { counselorId, appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);
    if (appointmentData && appointmentData.counselorId === counselorId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        isCompleted: true,
      });
      return res.json({ success: true, message: "Appointment Completed" });
    } else {
      return res.json({ success: false, message: "Mark Failed" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API to cancel appointment completed for counselor panel
const appointmentCancel = async (req, res) => {
  try {
    const { counselorId, appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);
    if (appointmentData && appointmentData.counselorId === counselorId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        cancelled: true,
      });
      return res.json({ success: true, message: "Appointment Cancelled" });
    } else {
      return res.json({ success: false, message: "Cancellation Failed" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
//API to get dashboard data for counselor panel
const counselorDashboard = async (req, res) => {
  try {
    const { counselorId } = req.body;
    const appointments = await appointmentModel.find({ counselorId });

    let students = [];
    appointments.map((item) => {
      if (!students.includes(item.studentId)) {
        students.push(item.studentId);
      }
    });

    const dashData = {
      appointments: appointments.length,
      students: students.length,
      latestAppointments: appointments.reverse().slice(0, 5),
    };
    res.json({ success: true, dashData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API to get counselor profile for Counselor Panel

const counselorProfile = async (req, res) => {
  try {
    const { counselorId } = req.body;
    const profileData = await counselorModel
      .findById(counselorId)
      .select("-password");

    res.json({ success: true, profileData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
//API to update counselor profile data from counselor panel

const updateCounselorProfile = async (req, res) => {
  try {
    const{counselorId,address,available} = req.body
    await counselorModel.findByIdAndUpdate(counselorId,{address,available})
    res.json({success:true,message:"Profile Updated"})
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
export {
  changeAvailability,
  counselorList,
  loginCounselor,
  appointmentsCounselor,
  appointmentCancel,
  appointmentComplete,
  counselorDashboard,
  counselorProfile,
  updateCounselorProfile
};
