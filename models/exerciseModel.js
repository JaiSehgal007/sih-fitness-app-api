import mongoose from "mongoose";

const exerciseSchema = new mongoose.Schema({
    muscle_id: {
        type: mongoose.ObjectId,
        ref: 'muscle'
    },
    name:{
        type:String,
        required:true,
        trim:true
    },
    url:{
        type:String,
        required:true,
    },
});

export default mongoose.model('exercise', exerciseSchema)
