import UserActivity from '../models/userActivityModel.js'

export const getActivityController = async (req, res) =>{
    try {
      // Retrieve the user's activity log based on the authenticated user's ID (req.user._id)
      const userActivityLog = await UserActivity.findOne({ client: req.user._id });
  
      if (!userActivityLog) {
        return res.status(404).json({ message: 'Activity log not found for this user' });
      }
  
      // Extract and send the activity log array from the userActivityLog document
      const activityLog = userActivityLog.activityLog;
      res.status(200).json(activityLog);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
}


export const setActivityController = async (req, res) =>{
    try {
      // Retrieve the user's userStats document based on the authenticated user's ID (req.user._id)
      let userStats = await UserActivity.findOne({ client: req.user._id });
  
      // If no userStats document exists for the user, create a new one
      if (!userStats) {
        userStats = new UserActivity({ client: req.user._id, activityLog: [] });
      }
  
      // Create a new activity log entry based on the request body
      const newActivityLog = {
        repetition: req.body.repetition,
        exercise: req.body.exercise
      };
  
      // Append the new activity log entry to the activityLog array
      userStats.activityLog.push(newActivityLog);
  
      // Save the updated userStats document
      await userStats.save();
  
      res.status(201).json({ message: 'Activity log entry added successfully', activityLog: userStats.activityLog });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }