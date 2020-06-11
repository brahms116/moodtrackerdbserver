import mongoose from 'mongoose'



export interface Irecords extends mongoose.Document{
    userID:string,
    description:string,
    score:number
}
const recordsSchema = new mongoose.Schema({
    userID:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    score:{
        type:Number,
        required:true,
        max:10,
        min:0
    }
},{timestamps:true})

export default mongoose.model<Irecords>('Records',recordsSchema)