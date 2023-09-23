import express from 'express'
import Exercise from '../models/exerciseModel.js'

const router=express.Router()

router.post('/set-exercise',async (req, res) => {
    try {
      // Create a new Exercise instance based on the request body
      const newExercise = new Exercise({
        muscle_id: req.body.muscle_id,
        name: req.body.name,
        url: req.body.url
      });
  
      // Save the new Exercise instance to the database
      const savedExercise = await newExercise.save();
  
      res.status(201).json(savedExercise);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });


export default router;