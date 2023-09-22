import express from 'express'
import colors from 'colors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import connectDB from './config/db.js'
import authRoute from './routes/authRoute.js'
import scheduleRoute from './routes/scheduleRoute.js'
import statsRoute from './routes/statsRoute.js'

// ENV file configuration
dotenv.config()

// connecting to MOngoDB database
connectDB();

// rest object
const app = express()

// middlewares
app.use(express.json())
app.use(morgan('dev'))

// auth routes
app.use('/api/v1/auth',authRoute);
// schedule routes
app.use('/api/v1/userschedule',scheduleRoute);
// statistics routes
app.use('/api/v1/userstats',statsRoute)

app.get('/',(req,res)=>{
    res.send('<h1>Welcome to FitCoach Website</h1>')
});

const PORT=process.env.PORT;

app.listen(PORT,()=>{
    console.log('Server is running'.bgCyan.white)
})