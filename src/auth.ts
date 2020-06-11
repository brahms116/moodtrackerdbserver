import express from 'express'
import jwt from 'jsonwebtoken'


type incomingJWT = {
    id:string,
    iat:number,
    exp:number
}

const isToken = (token:any):token is incomingJWT =>{
    return (token as incomingJWT).id!==undefined
}

const router = express.Router()

router.all('*',(req,res,next)=>{
    const token = req.header('authorization')
    if(token){
        jwt.verify(token,process.env.JWT_SECRET as string,(err,decoded)=>{
            if(err){
                return res.status(403).send("Access Denied")
            }
            else{
                if(isToken(decoded)){
                    req.body= {...req.body,userID:decoded.id}
                    return next()
                }
            }
            return
        })
    }
    else{
        return res.status(403).send("Access Denied")
    }
})



export default router