import mongoose from "mongoose";

const userActivitySchema = new mongoose.Schema({
    client: {
        type: mongoose.ObjectId,
        ref: 'users'
    },
    activityLog: [
        {
            timestamp: {
                type: Date,
                default: Date.now
            },
            repetition: {
                type: Number,
                required: true
            },
            exercise: {
                type: String,
                required: true
            }
        }
    ]
});

export default mongoose.model('userActivity', userActivitySchema)
