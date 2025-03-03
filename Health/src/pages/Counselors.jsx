import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Counselors = () => {
  const { speciality } = useParams();
  const [filterCouns, setFilterCouns] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const navigate = useNavigate();
  
  const { counselors } = useContext(AppContext);

  const applyFilter = () => {
    if (speciality) {
      setFilterCouns(
        counselors.filter(couns => 
          couns.speciality.trim().toLowerCase() === speciality.trim().toLowerCase()
        )
      );
    } else {
      setFilterCouns(counselors);
    }
  };

  useEffect(() => {
    console.log("Speciality:", speciality);
    console.log("Counselors:", counselors);
    applyFilter();
  }, [counselors, speciality]);

  return (
    <div>
      <p className='text-gray-600'>Browse through the counselors specialist</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>

        {/* Filter Toggle Button for Small Screens */}
        <button 
          className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${
            showFilter ? 'bg-blue-400 text-white' : ''
          }`} 
          onClick={() => setShowFilter(prev => !prev)}
        >
          Filters
        </button>

        {/* Filter List */}
        <div className={`flex flex-col gap-4 text-sm text-gray-600 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
          {['Psychologists', 'Counselors', 'Psychiatrists', 'Addiction Counselors', 'Psychoanalysts', 'Therapists'].map((type) => (
            <p
              key={type}
              onClick={() => speciality === type ? navigate('/counselors') : navigate(`/counselors/${type}`)}
              className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
                speciality === type ? 'bg-indigo-100 text-black' : ''
              }`}
            >
              {type}
            </p>
          ))}
        </div>

        {/* Counselors Grid */}
        <div className='w-full grid grid-cols-5 gap-4 gap-y-6'>
          {filterCouns.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(`/appointment/${item._id}`)}
              className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-500"
            >
              <img className="bg-blue-50" src={item.image} alt="" />
              <div className="p-4">
              <div
         className={`flex items-center 
   gap-2 text-sm text-center ${
           item.available ? " text-green-500" : "text-red-600"
         }`}
       >
         <p
           className={`w-2 h-2 ${
             item.available ? "bg-green-500" : "bg-gray-500"
           }rounded-full`}
         ></p>
         <p>{item.available ? "Available" : "Not Available"}</p>
       </div>
                <p className="text-gray-900 text-lg font-medium">{item.name}</p>
                <p className="text-gray-600 text-sm">{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Counselors;
