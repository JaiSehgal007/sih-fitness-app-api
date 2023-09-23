import userMuscle from "../models/userMuscleModel.js";
import exercise from "../models/exerciseModel.js";
const counter = {
    1: countBicepCurls
}
function getExerciseCounter(eId){
  return countBicepCurls;
}
const init_state = {
    count: 0,
    movement: 0,
    accuracy: 0,
    feedback: "Start",
    limit: -1,
}
/*
    task: {
        userId: int,
        eId: int,
    }
    landmarks: {
        x: int,
        y: int
    }[]
    pastState: {
        count: int,
        movement: int,
        accuracy: int,
        feedback: string
    }
*/
export async function trainUser(task,landmarks,pastState){
  if(pastState === null){
        pastState = init_state
    }
    if(pastState.finished) return pastState;
    if(pastState.limit==-1){
      console.log("setting limit ",task,pastState);
      // fetch current muscle strength from mongodb
      const mu = await userMuscle.findOne({client: task.userId});
      if(mu === null){
          pastState.feedback = "User not found"
          return pastState;
      }
      const ex =  await exercise.findOne({_id: task.eId});
      if(ex === null){
          pastState.feedback = "exercise not found"
          return pastState;
      }
      const muscle_id = ex.muscle_id;
      // find muscle strength from muscle_id
      let muscle=null;
      for(let i=0;i<mu.muscleData.length;i++){
          if(mu.muscleData[i].muscle_id.equals(muscle_id)){
              muscle = mu.muscleData[i];
              break;
          }
      }
      console.log("Muscle id",muscle_id,"mu ",mu,"ex",ex,"muscle",muscle)
      if(!muscle){
          pastState.feedback = "Muscle not found"
          return pastState;
      }
      const muscle_strength = muscle.value;
        // find limit based on current muscle strength using- (prev/10+1)*12
      let limit =  Math.ceil((muscle_strength / 10 + 1) * 12);
      console.log("Limit",limit)
      pastState.limit = limit;
    }
    let state = getExerciseCounter(task.eid)(landmarks,pastState)
    if(state.count >= state.limit){
        console.log("Task completed for user ",task.userId)
        state.feedback = "Finished"
        state.finished = true;
        // update muscle 
        const mu = await userMuscle.findOne({client: task.userId});
        if(mu === null){
            pastState.feedback = "User not found"
            return pastState;
        }
        const ex =  await exercise.findOne({_id: task.eId});
        if(ex === null){
            pastState.feedback = "exercise not found"
            return pastState;
        }
        const muscle_id = ex.muscle_id;
        // find muscle strength from muscle_id
        let muscle= mu.muscleData.find((muscle) => muscle.muscle_id.equals(muscle_id));
        if(!muscle){
            pastState.feedback = "Muscle not found"
            return pastState;
        }
        muscle.value += 10;
        await mu.save();
        // console.log("Muscle id",muscle_id,"mu ",mu,"ex",ex,"muscle",muscle,"updated successfull")
    }
    else if(state.count > pastState.count) { 
        console.log("Task incomplete current staet",state)
    }
    return state;
}

// counting biceps curls given landmarks and state information
// state represent phase for the exercise to keep track of the exercise
// at the end of the state update the counter 
// landmarks are from media pipe model
// assuming    right

function angleOfSingleLine(point1,point2){
    return Math.atan2(point2.y-point1.y,point2.x-point1.x);
}
// exercise parameters
const exrInfo = {
    bicepCurls: {
      index: [12, 14, 16],
      highAngle: 160,
      lowAngle: 50,
    },
  };

function angleBetweenThreePoints(point1,point2,point3){
    let radians = Math.atan2(point3.y-point2.y,point3.x-point2.x) - Math.atan2(point1.y-point2.y,point1.x-point2.x);
    let angle = radians * (180 / Math.PI);
    if(angle>180){
        angle = 360-angle
    }
    return angle;
}
// state: {
// count:int,
// movement: 0 (down) 1 (up)
// accuracy: int
// feedback: string
// }
function countBicepCurls(landmarks,state) {
    let points = []
    for(let i=0;i<exrInfo.bicepCurls.index.length;i++){
        points.push(landmarks[exrInfo.bicepCurls.index[i]])
    }
    let shoulder = points[0]
    let elbow = points[1]
    let arm = points[2]
    const angle = angleBetweenThreePoints(arm,elbow,shoulder)
    const exercise = "bicepCurls"
    // check for state
    if (angle > exrInfo[exercise].highAngle) {
        
        if (state.movement === 0) {
          
          console.log(state.count, " ", state.movement, " decrement ", angle);
          state.movement = 1;
        // find abs difference between current angle and low angle
         state.accuracy = Math.abs(exrInfo[exercise].lowAngle - angle);
          state.feedback = "Good Low, Now move up";
        }
      }
      if (angle < exrInfo[exercise].lowAngle) {
        if (state.movement === 1) {
            console.log(state.count, " ", state.movement, " increment ", angle);
            state.count += 1;
            state.accuracy = Math.abs(exrInfo[exercise].highAngle - angle);
            state.feedback = "Good High, Now move down";
          state.movement = 0;
        }
      }
    return state
}