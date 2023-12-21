import express from 'express'
import colors from 'colors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors';
import connectDB from './config/db.js'
import authRoute from './routes/authRoute.js'
import scheduleRoute from './routes/scheduleRoute.js'
import statsRoute from './routes/statsRoute.js'
import exerciseRoute from './routes/exerciseRoute.js'
import muscleRoute from './routes/muscleRoute.js'
import userMuscleRoute from './routes/userMuscleRoute.js'
import activityLogRoute from './routes/activityLogRoute.js'
import { Server } from "socket.io";
import http from "http";
import { trainUser } from './helpers/train.js'

// ENV file configuration
dotenv.config()

// connecting to MongoDB database
connectDB();
// rest object
const app = express()
const server = http.createServer(app);
app.use(cors());
const io = new Server(server,
    {
        cors: {
            origin: "https://fit-quest-mu.vercel.app",
            methods: ["GET", "POST"],
            credentials: true
            // authorization header
        }
    }
    );
io.of('/ws').on('connection', (socket) => {
    console.log('a user connected');
    let pastState = null
    socket.on("train",async (task,landmarks)=>{
            pastState = await trainUser(
                JSON.parse(task)
                ,
            JSON.parse(landmarks)
            ,pastState)
            
            socket.timeout(10)
            .emit('feedback',
            JSON.stringify(
                {
                    ...pastState,
                }
            )
            )
            if(pastState.finished){
                socket.disconnect()
            }
    })
    
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});
// middlewares
app.use(express.json())
app.use(morgan('dev'))


// auth routes
app.use('/api/v1/auth',authRoute);
// schedule routes
app.use('/api/v1/userschedule',scheduleRoute);
// statistics routes
app.use('/api/v1/userstats',statsRoute)
// activity routes
app.use('/api/v1/activitylog',activityLogRoute)
// exercise Routes
app.use('/api/v1/exercise',exerciseRoute)
// muscle Routes
app.use('/api/v1/muscle',muscleRoute)
// user Muscle route
app.use('/api/v1/usermuscle',userMuscleRoute)

app.get('/',(req,res)=>{
    res.send('<h1>Welcome to MotionMentor Website</h1>')
});

const PORT=process.env.PORT;

server.listen(PORT,()=>{
    console.log('Server is running'.bgCyan.white)
})
