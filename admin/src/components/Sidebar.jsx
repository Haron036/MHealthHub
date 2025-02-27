import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { CounselorContext } from "../context/CounselorContext";

const Sidebar = () => {
  const { aToken } = useContext(AdminContext);
  const {cToken} = useContext(CounselorContext)
  return (
    <div className="min-h-screen bg-white border-r">
      {aToken && (
        <ul className="text-[#515151] mt-5">
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-blue-400" : ""
              }`
            }
            to={"/admin-dashboard"}
          >
            <img src={assets.home_icon} alt="" />
            <p className="hidden md:block">Dashboard</p>
          </NavLink>
          <NavLink
            className={({
              isActive,
            }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72
      cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-blue-400" : ""}`}
            to={"/all-appointments"}
          >
            <img src={assets.appointment_icon} alt="" />
            <p className="hidden md:block">Appointments</p>
          </NavLink>
          <NavLink
            className={({
              isActive,
            }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72
      cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-blue-400" : ""}`}
            to={"/add-counselor"}
          >
            <img src={assets.add_icon} alt="" />
            <p className="hidden md:block">Add Counselor</p>
          </NavLink>
          <NavLink
            className={({
              isActive,
            }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72
     cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-blue-400" : ""}`}
            to={"/couselor-list"}
          >
            <img src={assets.people_icon} alt="" />
            <p className="hidden md:block">Counselors List</p>
          </NavLink>
        </ul>
      )}



{cToken && (
      <ul className="text-[#515151] mt-5">
        <NavLink
          className={({ isActive }) =>
            `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
              isActive ? "bg-[#F2F3FF] border-r-4 border-blue-400" : ""
            }`
          }
          to={"/counselor-dashboard"}
        >
          <img src={assets.home_icon} alt="" />
          <p className="hidden md:block">Dashboard</p>
        </NavLink>
        <NavLink
          className={({
            isActive,
          }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72
    cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-blue-400" : ""}`}
          to={"/counselor-appointments"}
        >
          <img src={assets.appointment_icon} alt="" />
          <p className="hidden md:block">Appointments</p>
        </NavLink>
    
        <NavLink
          className={({
            isActive,
          }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72
   cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-blue-400" : ""}`}
          to={"/counselor-profile"}
        >
          <img src={assets.people_icon} alt="" />
          <p className="hidden md:block">Profile</p>
        </NavLink>
      </ul>
    )}





    </div>
  );
};

export default Sidebar;
