import express from 'express'
import { requireSignIn } from '../middlewares/authMiddleware.js';
import { deleteDayController, editScheduleController, getScheduleController, getScheduledDaysController, setScheduleController, setSchedulesController } from '../controllers/userScheduleController.js';

const router=express.Router()

// create the routes collectively at beggining
router.post('/set-schedules',requireSignIn,setSchedulesController);

// creating single day route
router.post('/set-schedule',requireSignIn,setScheduleController);

// retrieve the list of available days
router.get('/get-days',requireSignIn,getScheduledDaysController)

// retrieve the selected day's routine
router.get('/get-schedule/:daySlug',requireSignIn,getScheduleController)

// edit the selected day activites
router.put('/edit-schedule',requireSignIn,editScheduleController)

// deleting the day
router.delete('/delete-day/:daySlug',requireSignIn,deleteDayController)




export default router;