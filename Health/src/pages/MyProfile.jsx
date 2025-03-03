import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
const MyProfile = () => {

  const {studentData,setStudentData,token,backendUrl,loadStudentProfileData} = useContext(AppContext)
  const [isEdit, setIsEdit] = useState(false);
  const [image,setImage] = useState(false)

  const updateStudentProfileData = async () =>{
    try {
      const formData = new FormData()

      formData.append('name',studentData.name)
      formData.append('regno',studentData.regno)
      formData.append('address', JSON.stringify(studentData.address))
      formData.append('gender',studentData.gender)
      formData.append('dob',studentData.dob)

      image && formData.append('image',image)

      const {data} = await axios.post(backendUrl + '/api/student/update-profile',formData,{headers:{token}})
      if (data.success) {
        toast.success(data.message)
        await loadStudentProfileData()
        setIsEdit(false)
        setImage(false) 
      } else{
        toast.error(data.message)
      }
      
    } catch (error) {
      console.log(error)
      toast.error(error.message)
      
    }

  }

  return studentData && (
    <div className="max-w-lg flex flex-col gap-2 text-sm">
      {
        isEdit? <label htmlFor="image">
          <div className="inline-block relative cursor-pointer">
            <img className="w-36 rounded opacity-75" src= {image? URL.createObjectURL((image)):studentData.image }alt=""/>
            <img src={image?'':assets.upload_icon } alt=""/>
          </div>
          <input onChange={(e)=>setImage(e.target.files[0])} type="file" name="" id="image" hidden/>

        </label>
        :<img className="w-36 rounded" src={studentData.
          image} alt="" />
      }
      
      {isEdit ? (
        <input className="bg-gray-50 text-3xl font-medium max-w-60 mt-4"
          type="text"
          value={studentData.name}
          onChange={(e) =>
            setStudentData((prev) => ({ ...prev, name: e.target.value }))
          }
        />
      ) : (
        <p className="font-medium text-3xl text-neutral-800 mt-4">{studentData.name}</p>
      )}
      <hr className="bg-zinc-400 h-[1px] border-none" />
      <div>
        <p className="text-neutral-500 underline mt-3">CONTACT INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
          <p className="font-medium">Email id:</p>
          <p className="text-blue-500">{studentData.email}</p>
          <p className="font-medium">RegNO:</p>
          {isEdit ? (
            <input className="bg-gray-100 max-w-52"
              type="text"
              value={studentData.regno}
              onChange={(e) =>
                setStudentData((prev) => ({ ...prev, regno: e.target.value }))
              }
            />
          ) : (
            <p className="text-blue-400">{studentData.regno}</p>
          )}
          <p className="font-medium">Address:</p>
          {isEdit ? (
            <p>
              <input className="bg-gray-50"
                onChange={(e) =>
                  setStudentData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value },
                  }))
                }
                value={studentData.address.line1}
                type="text"
              />
              <br></br>
            </p>
          ) : (
            <p className="text-gray-500">{studentData.address.line1}</p>
          )}
        </div>
      </div>
      <div>
        <p className="text-neutral-500 underline mt-3">BASIC INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
          <p className="font-medium">Gender:</p>
          {isEdit ? (
            <select className="max-w-20 bg-gray-100"
              onChange={(e) =>
                setStudentData((prev) => ({ ...prev, gender: e.target.value }))
              }
              value={studentData.gender}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : (
            <p className="text-gray-400">{studentData.gender}</p>
          )}
          <p className="font-medium">Birthday</p>
          {
            isEdit 
            ? <input className="max-w-28 bg-gray-100" type="date"  onChange={(e) =>
              setStudentData((prev) => ({ ...prev, dob: e.target.value }))
            } value={studentData.dob}/>
            :<p className="text-gray-400">{studentData.dob}</p>
          }
        </div>
      </div>
      <div className="mt-10">
        {
          isEdit
          ?<button className="border border-blue-400 px-8 py-2 rounded-full hover:bg-blue-400 hover:text-white transition-all" onClick={updateStudentProfileData}>Save information</button>
          :<button className="border border-blue-400 px-8 py-2 rounded-full  hover:bg-blue-400 hover:text-white transition-all" onClick={()=>setIsEdit(true)}>Edit</button>
        }

      </div>
    </div>
  );
};

export default MyProfile;
