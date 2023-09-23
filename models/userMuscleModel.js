import mongoose from "mongoose";

const userMuscleSchema = new mongoose.Schema({
    client: {
        type: mongoose.ObjectId,
        ref: 'users'
    },
    muscleData: [
        {
            muscle_id: {
                type: mongoose.ObjectId,
                ref: 'muscle'
            },
            value: {
                type: Number,
                default: 0
            }
        }
    ]
});

export default mongoose.model('userMuscle', userMuscleSchema);
