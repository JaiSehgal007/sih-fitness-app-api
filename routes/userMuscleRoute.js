import express from 'express'
import Muscle from '../models/muscleModel.js'

const router=express.Router()

router.post('/set-muscle',async (req, res) => {
  try {
    // Create a new Muscle instance based on the request body
    const newMuscle = new Muscle({
      name: req.body.name,
      url: req.body.url
    });

    // Save the new Muscle instance to the database
    const savedMuscle = await newMuscle.save();

    res.status(201).json(savedMuscle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;