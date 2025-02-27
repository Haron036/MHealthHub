import React, { useContext } from "react";
import Login from "./pages/Login";

import { ToastContainer, toast } from "react-toastify";
import { AdminContext } from "./context/AdminContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Admin/Dashboard";
import AllAppointments from "./pages/Admin/AllAppointments";
import AddCounselor from "./pages/Admin/AddCounselor";
import CouselorsList from "./pages/Admin/CouselorsList";
import { CounselorContext } from "./context/CounselorContext";
import CounselorDashboard from "./pages/Counselor/CounselorDashboard";
import CounselorAppointment from "./pages/Counselor/CounselorAppointment";
import CounselorProfile from "./pages/Counselor/CounselorProfile";
const App = () => {
  const { aToken } = useContext(AdminContext);
  const { cToken } = useContext(CounselorContext);

  return aToken || cToken ? (
    <div className="bg-[#F8F9Fd]">
      <ToastContainer />

      <Navbar />
      <div className="flex items-start">
        <Sidebar />
        <Routes>
          {/*Admin Route*/}
          <Route path="/" element={<></>} />
          <Route path="/admin-dashboard" element={<Dashboard />} />
          <Route path="/all-appointments" element={<AllAppointments />} />
          <Route path="/add-counselor" element={<AddCounselor />} />
          <Route path="/counselor-list" element={<CouselorsList />} />

          {/* Counselor Route*/}
          <Route path="/counselor-dashboard" element={<CounselorDashboard />} />
          <Route
            path="/counselor-appointments"
            element={<CounselorAppointment />}
          />
          <Route path="/counselor-profile" element={<CounselorProfile />} />
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  );
};

export default App;
