import { createContext, useState } from "react";
import axios from 'axios'
import {toast} from 'react-toastify'

export const CounselorContext= createContext();

const CounselorContextProvider = (props) =>{

    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [cToken,setCToken] = useState(localStorage.getItem('cToken')?localStorage.getItem('cToken'):'');
    const [appointments,setAppointments] = useState([])
    const[dashData,setDashData] = useState(false)
    const[profileData,setProfileData] = useState(false)

    const getAppointments =async () =>{
        try {
            const {data} =  await axios.get(backendUrl + '/api/counselor/appointments',{headers:{cToken}})
            if (data.success) {
                setAppointments(data.appointments)
                console.log(data.appointments);
                
                
            }else{
                toast.error(data.message)

            }
            
        } catch (error) {
            console.log(error);
            toast.error(error.message)
            
            
        }
    }

    const completeAppointment = async (appointmentId) =>{
        try {

            const {data} = await axios.post(backendUrl + '/api/counselor/complete-appointment',{appointmentId},{headers:{cToken}})
            if ((data.success)) {
                toast.success(data.message)
                getAppointments()
                
            }
            else{
                toast.error(data.message)
            }
            
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }


    const cancelAppointment = async (appointmentId) =>{
        try {

            const {data} = await axios.post(backendUrl + '/api/counselor/cancel-appointment',{appointmentId},{headers:{cToken}})
            if ((data.success)) {
                toast.success(data.message)
                getAppointments()
                
            }
            else{
                toast.error(data.message)
            }
            
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }


const getDashData = async () =>{
    try {
        const {data} = await axios.get(backendUrl+'/api/counselor/dashboard',{headers:{cToken}})
        if (data.success) {
            setDashData(data.dashData)
            console.log(data.dashData);
            
        }else{
            toast.error(data.message)
        }
        
    } catch (error) {
        console.log(error);
        toast.error(error.message)
        
    }
}


const getProfileData = async() =>{
    try {
        const {data}= await axios.get(backendUrl+ '/api/counselor/profile',{headers:{cToken}})
        if (data.success) {
            setProfileData(data.profileData)
            console.log(data.profileData);
            
            
        }
        
    } catch (error) {
        console.log(error);
toast.error(error.message)
    }
}



    const value = {
        cToken,setCToken,
        backendUrl,appointments,setAppointments,getAppointments,completeAppointment,cancelAppointment,dashData,setDashData,getDashData,profileData,setProfileData,getProfileData

    }
    return(
        <CounselorContext.Provider value={value}>
            {props.children}
        </CounselorContext.Provider>
    )

}

export default CounselorContextProvider