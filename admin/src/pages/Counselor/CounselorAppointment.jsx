import React, { useContext, useEffect } from "react";
import { CounselorContext } from "../../context/CounselorContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const CounselorAppointment = () => {
  const {
    cToken,
    appointments,
    getAppointments,
    completeAppointment,
    cancelAppointment,
  } = useContext(CounselorContext);
  const { calculateAge, slotDateFormat } = useContext(AppContext);
  useEffect(() => {
    if (cToken) {
      getAppointments();
    }
  }, [cToken]);
  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>
      <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll">
        <div className="max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr_1fr] gap-5 py-3 px-5 border-b">
          <p>#</p>
          <p>Student</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p> Action</p>
        </div>

        
        {
        appointments.reverse().map((item, index) => (
          <div
            className="flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr_1fr] gap-3 items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-100"
            key={index}
          >
            <p className="max-sm:hidden">{index + 1}</p>
            <div className="flex items-center gap-2">
              <img
                className="w-8 rounded-full"
                src={item.studentData.image}
                alt=""
              />
              <p>{item.studentData.name}</p>
            </div>
            <p className="max-sm:hidden">
              {calculateAge(item.studentData.dob)}
            </p>
            <p className="whitespace-nowrap">
              {slotDateFormat(item.slotDate)},{item.slotTime}
            </p>

            {item.cancelled ? (
              <p className="text-red-600 text-xs font-medium">Cancelled</p>
            ) : item.isCompleted ? (
              <p className="text-green-600 text-xs font-medium"> Completed</p>
            ) : (
              <div className="flex  ">
                <img
                  onClick={() => cancelAppointment(item._id)}
                  className="w-10 cursor-pointer"
                  src={assets.cancel_icon}
                  alt=""
                />
                <img
                  onClick={() => completeAppointment(item._id)}
                  className="w-10 cursor-pointer"
                  src={assets.tick_icon}
                  alt=""
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CounselorAppointment;
