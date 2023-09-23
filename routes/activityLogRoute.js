import express from 'express'
import { requireSignIn } from '../middlewares/authMiddleware.js';
import { setActivityController,getActivityController } from '../controllers/userActivityController.js';

const router=express.Router()

router.post('/set-activity-log',requireSignIn,setActivityController);

router.get('/get-activity-log',requireSignIn,getActivityController);


export default router;