import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import { toast } from "react-toastify";
export const AppContext = createContext()
const AppContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const[counselors,setCounselors] = useState([])
    const [token,setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):false)
    const[studentData,setStudentData]= useState(false)

    const getCounselorsData = async () =>{
        try {
            const {data} =await axios.get(backendUrl + '/api/counselor/list')
            if(data.success){
                setCounselors(data.counselors)

            }else{
                toast.error(data.message)
            }
            
        } catch (error) {
            console.log(error)
            toast.error(error.message)
            
        }
        
    }

    const loadStudentProfileData = async()=>{
        try {
            const{data} = await axios.get(backendUrl+ '/api/student/get-profile',{headers:{token}})
            if (data.success){
                setStudentData(data.studentData)
            }else{
                toast.error(data.message)
            }
            
        } catch (error) {
            console.log(error)
            toast.error(error.message)
            
        }

    }

    const value = {
        counselors,getCounselorsData,
        token,setToken,backendUrl,
        studentData,setStudentData,
        loadStudentProfileData
    }

    useEffect(()=>{
        getCounselorsData()

    },[])
    useEffect(()=>{
        if (token) {
            loadStudentProfileData();
        }else{
            setStudentData(false)
        }
    },[token])
    
    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
    
      
}
export default AppContextProvider