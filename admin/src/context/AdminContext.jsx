import { createContext, useState } from "react";
import axios from 'axios'
import {toast} from 'react-toastify'

export const AdminContext= createContext();

const AdminContextProvider = (props) =>{
    const [aToken,setAtoken] = useState(localStorage.getItem('aToken')?localStorage.getItem('aToken'):'')

    const [counselors,setCounselors] = useState([])
    const [appointments,setAppointments] = useState([])
    const [dashData,setDashData] = useState(false)

    const backendUrl= import.meta.env.VITE_BACKEND_URL

    const getAllCounselors = async () =>{
        try {
            const {data} = await axios.post(backendUrl+ '/api/admin/all-counselors',{},{headers:{aToken}})
            if(data.success){
                setCounselors(data.counselors)
                console.log(data.counselors)
                
            }else{
                toast.error(data.message)
            }
            
        } catch (error) {
            
            toast.error(error.message)
            
        }
    }
    const changeAvailability = async (counselorId) =>{
        try {
            const {data} = await axios.post(backendUrl+ '/api/admin/change-availability',{counselorId},{headers:{aToken}})
            if(data.success){
                toast.success(data.message)
                getAllCounselors()
            }else{
                toast.error(data.message)
            }
            
        } catch (error) {
            toast.error(error.message)
            
        }

    }

    const getAllAppointments = async () =>{
        try {
            const{data} = await axios.get(backendUrl+'/api/admin/appointments',{headers:{aToken}})
            
            if (data.success) {
                setAppointments(data.appointments)
                console.log(data.appointments);
                
            }else{
                toast.error(data.message)
            }
            
        } catch (error) {
            toast.error(error.message)
            
        }

    }
    const cancelAppointment = async (appointmentId) =>{

        try { 
            const{data} = await axios.post(backendUrl+'/api/admin/cancel-appointment',{appointmentId},{headers:{aToken}})

            if(data.success){
                toast.success(data.message)
                getAllAppointments()
            }else{
               toast.error(data.message) 
            }
            
        } catch (error) {
            toast.error(error.message)
            
        }

    }
   
   
   
   

   
   
   
   
   
   
   
   
   
   
   
   
    const getDashData = async () => {
        try {
            
            const response = await axios.get(backendUrl + "/api/admin/dashboard", { headers: { aToken } });
    
            console.log("Full response:", response); // Log the full response
    
            if (response.data.success) {
                setDashData(response.data.dashData);
                console.log("Dashboard Data:", response.data.dashData);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("API request failed:", error);
    
            // Check if response exists (meaning the request was made but failed)
            if (error.response) {
                console.error("Response error:", error.response.data);
                toast.error(error.response.data.message || "Something went wrong");
            } else {
                // General network error (no response from server)
                toast.error("Network error. Please try again.");
            }
        }
    };
    
   
   

    const value = {
        aToken,setAtoken,
        backendUrl,counselors,getAllCounselors,changeAvailability,appointments,setAppointments,getAllAppointments,cancelAppointment,dashData,getDashData

    }
    return(
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )

}

export default AdminContextProvider