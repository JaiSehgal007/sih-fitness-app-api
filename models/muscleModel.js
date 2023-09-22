import mongoose from "mongoose";

const muscleSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    url:{
        type:String,
        required:true,
    }
});

export default mongoose.model('muscle',muscleSchema)