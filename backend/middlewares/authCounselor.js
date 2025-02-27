import jwt from 'jsonwebtoken'

//counselor authentication middleware
const authCounselor = async (req,res,next) =>{
    try{
        const {ctoken} = req.headers
        if(!ctoken){
            return res.json({success:false,message:"Access Denied Login Again"})
        }
        const token_decode = jwt.verify(ctoken,process.env.JWT_SECRET)
        req.body.counselorId = token_decode.id
        
    
        next()

    } catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }

}
export default authCounselor


