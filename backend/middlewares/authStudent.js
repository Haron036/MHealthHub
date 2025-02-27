import jwt from 'jsonwebtoken'

//student authentication middleware
const authStudent = async (req,res,next) =>{
    try{
        const {token} = req.headers
        if(!token){
            return res.json({success:false,message:"Access Denied Login Again"})
        }
        const token_decode = jwt.verify(token,process.env.JWT_SECRET)
        req.body.studentId = token_decode.id
        
    
        next()

    } catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }

}
export default authStudent


