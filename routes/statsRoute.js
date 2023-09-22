import express from 'express';
import { requireSignIn } from '../middlewares/authMiddleware.js';
import {getDailyStats,getMonthlyStats,getBodyLevels,getTrophies,getHealthScore} from '../controllers/userStatsController.js';

const router=express.Router()

// retrieve the list of available days
router.get('/daily-stats',requireSignIn,getDailyStats)

// retrieve the selected day's routine
router.get('/monthly-stats',requireSignIn,getMonthlyStats)

// edit the selected day activites
router.get('/body-levels',requireSignIn,getBodyLevels)

// retrieve the selected day's routine
router.get('/trophies',requireSignIn,getTrophies)

// edit the selected day activites
router.get('/health-score',requireSignIn,getHealthScore)

export default router;