import userScheduleModel from '../models/userScheduleModel.js'

export const setSchedulesController = async (req, res) => {
    try {
        const { monday, tuesday, wednesday, thursday, friday, saturday, sunday } = req.body;
        const client = req.user._id;
    
        // Create a new userSchedule object with the data from the request body
        const newUserScheduleData = {
          client,
          monday: monday || [],      
          tuesday: tuesday || [],    
          wednesday: wednesday || [],
          thursday: thursday || [],  
          friday: friday || [],      
          saturday: saturday || [],  
          sunday: sunday || [],      
        };
    
        const newUserSchedule = new userScheduleModel(newUserScheduleData);
    
        // Save the object to the database
        await newUserSchedule.save();
    
        res.status(201).json({ message: 'User schedule saved successfully' });
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while saving the schedule' });
      }
}


export const setScheduleController = async (req, res) => {
    try {
        const { Day, exerciseData } = req.body; // Destructure the Day and exerciseData from the request body

        // Find the userSchedule object by client ID (req.user._id)
        const userSchedule = await userScheduleModel.findOne({ client: req.user._id });

        if (!userSchedule) {
            return res.status(404).json({ error: 'User schedule not found' });
        }

        // Update the exerciseData for the specified day
        userSchedule[Day.toLowerCase()] = exerciseData;

        // Save the updated object to the database
        await userSchedule.save();

        res.status(200).json({ message: 'User schedule updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the schedule' });
    }

}


export const getScheduledDaysController = async (req, res) => {
    try {
        // Find the userSchedule object by client ID (req.user._id)
        const userSchedule = await userScheduleModel.findOne({ client: req.user._id });

        if (!userSchedule) {
            return res.status(404).json({ error: 'User schedule not found' });
        }

        // Initialize an array to store the names of days with exercises scheduled
        const scheduledDays = [];

        // Loop through the days of the week and check if their arrays are non-empty
        const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

        for (const day of daysOfWeek) {
            if (userSchedule[day] && userSchedule[day].length > 0) {
                scheduledDays.push(day);
            }
        }

        res.status(200).json({ scheduledDays });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching scheduled days' });
    }
}

export const getScheduleController = async (req, res) => {
    try {
        const { daySlug } = req.params; // Extract the day slug from the request parameters

        // Find the userSchedule object by client ID (req.user._id)
        const userSchedule = await userScheduleModel.findOne({ client: req.user._id });

        if (!userSchedule) {
            return res.status(404).json({ error: 'User schedule not found' });
        }

        // Convert the day slug to lowercase to match the schema field name
        const dayFieldName = daySlug.toLowerCase();

        // Check if the day field exists in the userSchedule and has data
        if (!userSchedule[dayFieldName] || userSchedule[dayFieldName].length === 0) {
            return res.status(404).json({ error: 'No exercises scheduled for this day' });
        }

        // Retrieve the exercise repetition array for the specified day
        const exerciseRepetitions = userSchedule[dayFieldName];

        res.status(200).json({ day: daySlug, exerciseRepetitions });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching exercise and repetitions' });
    }
}

export const editScheduleController = async (req, res) => {
    try {
        const { Day, exerciseData } = req.body; // Destructure the Day and exerciseData from the request body

        // Find the userSchedule object by client ID (req.user._id)
        const userSchedule = await userScheduleModel.findOne({ client: req.user._id });

        if (!userSchedule) {
            return res.status(404).json({ error: 'User schedule not found' });
        }

        // Update the exerciseData for the specified day
        userSchedule[Day.toLowerCase()] = exerciseData;

        // Save the updated object to the database
        await userSchedule.save();

        res.status(200).json({ message: 'User schedule updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the schedule' });
    }
}


export const deleteDayController = async (req, res) => {
    try {
        const { daySlug } = req.params; // Extract the day slug from the request parameters

        // Find the userSchedule object by client ID (req.user._id)
        const userSchedule = await userScheduleModel.findOne({ client: req.user._id });

        if (!userSchedule) {
            return res.status(404).json({ error: 'User schedule not found' });
        }

        // Convert the day slug to lowercase to match the schema field name
        const dayFieldName = daySlug.toLowerCase();

        // Check if the day field exists in the userSchedule
        if (!userSchedule[dayFieldName]) {
            return res.status(404).json({ error: 'No exercises scheduled for this day' });
        }

        // Clear the exercise array for the specified day
        userSchedule[dayFieldName] = [];

        // Save the updated userSchedule object to the database
        await userSchedule.save();

        res.status(200).json({ message: `Exercises for ${daySlug} cleared successfully` });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while clearing exercises' });
    }
}