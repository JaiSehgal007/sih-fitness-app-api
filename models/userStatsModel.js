import mongoose from "mongoose";

const userStatsSchema = new mongoose.Schema({
    client: {
        type: mongoose.ObjectId,
        ref: 'users'
    },
    dailyStats: [
        {
            date: Date,
            calories: { type: Number, default: 0 }
        }
    ],
    trophies: {
        type:Number,
        default:0
    },
    healthScore: {
        type:Number,
        default:0
    },
});

export default mongoose.model('userStats', userStatsSchema)
