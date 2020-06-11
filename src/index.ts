import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import auth from './auth'
import records from './records'




dotenv.config()
const app = express()



app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use(auth)

app.get('/login',(req,res)=>{
    //console.log(req.body)
    return res.status(200).send(`Token verified, token:${req.body.userID}`)
})

app.use('/records',records)

app.listen(process.env.PORT,async()=>{
    console.log(`server started at port:${process.env.PORT}`)
    try{
        await mongoose.connect(process.env.MONGO_URI as string,{useNewUrlParser:true, useUnifiedTopology:true})
        console.log("db connected")
    }catch(err){
        console.log(err)
    }
})




