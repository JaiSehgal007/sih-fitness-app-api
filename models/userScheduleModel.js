import mongoose from "mongoose";

const userScheduleSchema = new mongoose.Schema({
    client: {
        type: mongoose.ObjectId,
        ref: 'users'
    },
    monday: [
        {
            exercise: String,
            repetition: Number,
            calories: { type: Number, default: 0 }
        }
    ],
    tuesday: [
        {
            exercise: String,
            repetition: Number,
            calories: { type: Number, default: 0 }
        }
    ],
    wednesday: [
        {
            exercise: String,
            repetition: Number,
            calories: { type: Number, default: 0 }
        }
    ],
    thursday: [
        {
            exercise: String,
            repetition: Number,
            calories: { type: Number, default: 0 }
        }
    ],
    friday: [
        {
            exercise: String,
            repetition: Number,
            calories: { type: Number, default: 0 }
        }
    ],
    saturday: [
        {
            exercise: String,
            repetition: Number,
            calories: { type: Number, default: 0 }
        }
    ],
    sunday: [
        {
            exercise: String,
            repetition: Number,
            calories: { type: Number, default: 0 }
        }
    ],
}, { timestamps: true });

export default mongoose.model('userSchedule', userScheduleSchema)
