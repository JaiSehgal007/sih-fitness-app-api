import express from 'express'
import { requireSignIn } from '../middlewares/authMiddleware.js';
import UserMuscle from '../models/userMuscleModel.js'

const router=express.Router()

router.get('/get-muscle-data', async (req, res) => {
    try {
      // query parameter: userId
      const userId = req.query?.userId;
      // Retrieve user muscle data based on the authenticated user's ID (req.user._id)
      const userMuscleData = await UserMuscle.findOne({ client: userId ?? req.user._id });
  
      if (!userMuscleData) {
        return res.status(404).json({ message: 'User muscle data not found' });
      }
  
      // Extract and send the muscleData array from the userMuscleData document
      const muscleData = userMuscleData.muscleData;
      res.status(200).json(muscleData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
});

router.post('/set-muscle-data',async (req, res) => {
    try {
      // 
      const userId = req.body?.userId;
      console.log("userId",userId);
      // Retrieve the user's userMuscle document based on the authenticated user's ID (req.user._id)
      let userMuscle = await UserMuscle.findOne({ client: userId ?? req.user._id });
  
      // If no userMuscle document exists for the user, create a new one
      if (!userMuscle) {
        userMuscle = new UserMuscle({ client: userId ?? req.user._id, muscleData: [] });
      }
  
      // Create a new muscleData entry based on the request body
      if(!(req.body.muscle_id==null || req.body.value==null)){

        const newMuscleDataEntry = {
          muscle_id: req.body.muscle_id,
          value: req.body.value
        };
    
        // Append the new muscleData entry to the muscleData array
        userMuscle.muscleData.push(newMuscleDataEntry);
    
        // Save the updated userMuscle document
      }
      await userMuscle.save();
  
      res.status(201).json({ message: 'Muscle data entry added successfully', muscleData: userMuscle.muscleData });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  

router.put('/update-muscle-data',requireSignIn,async (req, res) => {
    try {
      // Retrieve the user's userMuscle document based on the authenticated user's ID (req.user._id)
      let userMuscle = await UserMuscle.findOne({ client: req.user._id });
  
      // If no userMuscle document exists for the user, create a new one
      if (!userMuscle) {
        userMuscle = new UserMuscle({ client: req.user._id, muscleData: [] });
      }
  
      // Extract muscle_id and value from the request body
      const { muscle_id, value } = req.body;
  
      // Check if the specified muscle_id exists in the muscleData array
      const muscleDataEntry = userMuscle.muscleData.find(entry => entry.muscle_id.toString() === muscle_id);
  
      if (muscleDataEntry) {
        // If the muscle_id exists, update its value
        muscleDataEntry.value = value;
      } else {
        // If the muscle_id doesn't exist, add a new entry to the muscleData array
        userMuscle.muscleData.push({
          muscle_id,
          value
        });
      }
  
      // Save the updated userMuscle document
      await userMuscle.save();
  
      res.status(200).json({ message: 'Muscle data entry updated successfully', muscleData: userMuscle.muscleData });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
});



export default router;