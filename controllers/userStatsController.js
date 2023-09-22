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

export const getMonthlyStats = async (req, res) => {
    try {
      // Check if the user already exists
      const existingUserStats = await UserStats.findOne({ client: req.user._id });
  
      if (!existingUserStats) {
        // If the user doesn't exist, create a new model with the user ID
        const newUserStats = new UserStats({ client: req.user._id });
        await newUserStats.save();
  
        // Return an empty array for monthlyStats as the user is new
        return res.json({ monthlyStats: [] });
      }
  
      // User exists, return their monthlyStats array
      const monthlyStats = existingUserStats.monthlyStats;
      res.json({ monthlyStats });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
};

export const getBodyLevels = async (req, res) => {
    try {
      // Check if the user exists
      const existingUserStats = await UserStats.findOne({ client: req.user._id });
  
      if (!existingUserStats) {
        // If the user doesn't exist, return default values for all levels
        return res.json({
          bicepsLevel: 0,
          tricepsLevel: 0,
          legsLevel: 0,
          chestLevel: 0,
          backLevel: 0,
          shoulderLevel: 0,
        });
      }
  
      // User exists, return their level values
      const levels = {
        bicepsLevel: existingUserStats.bicepsLevel,
        tricepsLevel: existingUserStats.tricepsLevel,
        legsLevel: existingUserStats.legsLevel,
        chestLevel: existingUserStats.chestLevel,
        backLevel: existingUserStats.backLevel,
        shoulderLevel: existingUserStats.shoulderLevel,
      };
  
      res.json(levels);
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

