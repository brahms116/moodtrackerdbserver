import express from 'express'
import Records,{Irecords} from './models/Records'

const router = express.Router()


router.post('/',async(req,res)=>{
    try {
        const records = {
            userID:req.body.userID,
            description:req.body.description,
            score:req.body.score
        }

        const newRecords = new Records(records);        
        const result = await newRecords.save()
        return res.status(200).send(result)       
        
    } catch (error) {
        return res.status(400).send(error)
    }
})


router.delete('/:id',async(req,res)=>{
    //console.log(req.params.id)
    try {
        const record = await Records.findById(req.params.id)
        
        if(!record){
            return res.status(400).send("document does not exist")
        }else{
            if (record.userID!=req.body.userID){
                return res.status(403).send("Access Denied")
            }
            const result = await Records.findByIdAndDelete(req.params.id)
            return res.status(200).send(result)
        }
        
    } catch (error) {
       return res.status(400).send(error)
    }
})


router.get('/averages',async(req,res)=>{
    try {
        const now= new Date()
        const pastWeek = (new Date()).setDate(now.getDate()-7)
        const pastMonth = (new Date()).setMonth(now.getMonth()-1)
        const past3Months = (new Date()).setMonth(now.getMonth()-3)
        const weekRecords = await Records.find({
            userID:req.body.userID,
            createdAt:{$lte:new Date(),$gte:pastWeek}
        })

        const monthRecords = await Records.find({
            userID:req.body.userID,
            createdAt:{$lte:new Date(),$gte:pastMonth}
        })

        const threeMonthRecords = await Records.find({
            userID:req.body.userID,
            createdAt:{$lte:new Date(),$gte:past3Months}
        })

        const result = {
            week:getAverage(weekRecords),
            month:getAverage(monthRecords),
            threeMonths:getAverage(threeMonthRecords)
        }


        return res.status(200).send(result)
        
    } catch (error) {
        return res.status(400).send(error)
    }
})


const getAverage = (arr:Irecords[])=>{
    let totalScore = 0
    arr.forEach(d=>{
        totalScore+=d.score
    })
    return totalScore/arr.length
}


export default router