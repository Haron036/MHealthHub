import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedCounselors from "../components/RelatedCounselors";
import { toast } from "react-toastify";
import axios from "axios";

const Appointment = () => {
  const { counselorId } = useParams();
  const { counselors, backendUrl, token, getCounselorsData } =
    useContext(AppContext);
  const daysOfweek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const navigate = useNavigate();

  const [counselorInfo, setCounselorInfo] = useState(null);
  const [counselorSlots, setCounselorSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  const fetchCounselorInfo = async () => {
    const counselorInfo = counselors.find(
      (counselor) => counselor._id === counselorId
    );
    setCounselorInfo(counselorInfo);
    console.log(counselorInfo);
  };

  const getAvailableSlots = async () => {
    setCounselorSlots([]);

    //getting current date
    let today = new Date();

    for (let i = 0; i < 7; i++) {
      //getting date with index
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);
      // setting end time of the date with index
      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      // setting hours
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }
      let timeSlots = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();

        const slotDate = day + "_" + month + "_" + year;
        const slotTime = formattedTime;

        const isSlotAvailable =
          counselorInfo.slots_booked[slotDate] &&
          counselorInfo.slots_booked[slotDate].includes(slotTime)
            ? false
            : true;

        if (isSlotAvailable) {
          // add slot to array
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          });
        }

        //Increment current time by 30 minutes
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      setCounselorSlots((prev) => [...prev, timeSlots]);
    }
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Login to book appointment");
      return navigate("/Login");
    }
    try {
      const date = counselorSlots[slotIndex][0].datetime;
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      const slotDate = day + "_" + month + "_" + year;

      const { data } = await axios.post(
        backendUrl + "/api/student/book-appointment",
        { counselorId, slotDate, slotTime },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        getCounselorsData();
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchCounselorInfo();
  }, [counselors, counselorId]);

  useEffect(() => {
    getAvailableSlots();
  }, [counselorInfo]);

  useEffect(() => {
    console.log(counselorSlots);
  }, [counselorSlots]);

  return (
    counselorInfo && (
      <div>
        {/*---------Counselors details---------*/}
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <img
              className="bg-blue-400 w-full sm:max-w-72 rounded-lg"
              src={counselorInfo.image}
              alt=""
            />
          </div>
          <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
            {/*-----DocInfo-------*/}
            <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
              {counselorInfo.name}{" "}
              <img className="w-5" src={assets.verified_icon} alt="" />
            </p>
            <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
              <p>
                {counselorInfo.degree} - {counselorInfo.speciality}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded-full">
                {counselorInfo.experience}
              </button>
            </div>
            {/*--------Counselor About-------*/}
            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
                {" "}
                About <img src={assets.info_icon} alt="" />
              </p>
              <p className="text-sm text-gray-500 max-w-[700px]mt-1">
                {counselorInfo.about}
              </p>
            </div>
          </div>
        </div>
        {/*------Booking slots----*/}
        <div className="sm:ml-72 sm:pl-4 font-medium text-gray-700">
          <p>Booking slots</p>
          <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
            {counselorSlots.length &&
              counselorSlots.map((item, index) => (
                <div
                  onClick={() => setSlotIndex(index)}
                  className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                    slotIndex === index
                      ? "bg-blue-400 text-white"
                      : "border border-gray-200"
                  }`}
                  key={index}
                >
                  <p>{item[0] && daysOfweek[item[0].datetime.getDay()]}</p>
                  <p>{item[0] && item[0].datetime.getDate()}</p>
                </div>
              ))}
          </div>
          <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
            {counselorSlots.length &&
              counselorSlots[slotIndex].map((item, index) => (
                <p
                  onClick={() => setSlotTime(item.time)}
                  className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
                    item.time === slotTime
                      ? "bg-blue-400 text-white"
                      : "text-gray-400 border border-gray-300"
                  }`}
                  key={index}
                >
                  {item.time.toLowerCase()}
                </p>
              ))}
          </div>

          <button
            onClick={bookAppointment}
            className="bg-blue-400 text-white text-sm font-light px-14 py-3 rounded-full my-6"
          >
            Book an appointment
          </button>
        </div>
        {/*Listing related Counselors */}
        <RelatedCounselors
          counselorId={counselorId}
          speciality={counselorInfo.speciality}
        />
      </div>
    )
  );
};

export default Appointment;
