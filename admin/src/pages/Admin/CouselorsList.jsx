import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';

const CounselorsList = () => {
  const { counselors, aToken, getAllCounselors, changeAvailability } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllCounselors();
    }
  }, [aToken, getAllCounselors]);

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Counselors</p>
      <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll">
        <div className="hidden sm:grid grid-cols-[1fr_2fr_2fr_2fr_1fr] py-3 px-6 border-b">
          <p>Image</p>
          <p>Name</p>
          <p>Specialty</p>
          <p>Degree</p>
          <p>Availability</p>
        </div>
        {counselors && counselors.map((item, index) => (
          <div
            className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[1fr_2fr_2fr_2fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-200"
            key={item._id}
          >
            <div className="flex items-center gap-2">
              <img
                className="w-8 rounded-full"
                src={item.image}
                alt={item.name}
              />
            </div>
            <p>{item.name}</p>
            <p>{item.speciality}</p>
            <p>{item.degree}</p>
            <input
              type="checkbox"
              checked={item.available}
              onChange={() => changeAvailability(item._id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CounselorsList;