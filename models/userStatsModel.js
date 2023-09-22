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
    monthlyStats: [
        {
            month: String,
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
    bicepsLevel: {
        type:Number,
        default:0
    },
    tricepsLevel: {
        type:Number,
        default:0
    },
    legsLevel: {
        type:Number,
        default:0
    },
    chestLevel: {
        type:Number,
        default:0
    },
    backLevel: {
        type:Number,
        default:0
    },
    shoulderLevel: {
        type:Number,
        default:0
    },
});

export default mongoose.model('userStats', userStatsSchema)
