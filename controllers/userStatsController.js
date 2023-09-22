import UserStats from '../models/userStatsModel.js'

export const getDailyStats = async (req, res) => {
    try {
      // Check if the user already exists
      const existingUserStats = await UserStats.findOne({ client: req.user._id });
  
      if (!existingUserStats) {
        // If the user doesn't exist, create a new model with the user ID
        const newUserStats = new UserStats({ client: req.user._id });
        await newUserStats.save();
  
        // Return an empty array for dailyStats as the user is new
        return res.json({ dailyStats: [] });
      }
  
      // User exists, return their dailyStats array
      const dailyStats = existingUserStats.dailyStats;
      res.json({ dailyStats });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
};

export const getTrophies = async (req, res) =>{
    try {
      // Check if the user exists
      const existingUserStats = await UserStats.findOne({ client: req.user._id });
  
      if (!existingUserStats) {
        // If the user doesn't exist, return 0 trophies
        return res.json({ trophies: 0 });
      }
  
      // User exists, return their trophies
      const trophies = existingUserStats.trophies;
      res.json({ trophies });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
};

export const getHealthScore = async (req, res) =>{
    try {
      // Check if the user exists
      const existingUserStats = await UserStats.findOne({ client: req.user._id });
  
      if (!existingUserStats) {
        // If the user doesn't exist, return 0 trophies
        return res.json({ healthScore: 0 });
      }
  
      // User exists, return their healthScore
      const healthScore = existingUserStats.healthScore;
      res.json({ healthScore });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
};

