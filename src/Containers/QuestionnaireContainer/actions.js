import axios from 'axios';
import {prepareRehabData} from '../Rehab/actions';
export function addQuestionnaire(state) {
  return(dispatch: Function) => {
    dispatch(uploading(true));
    let token = sessionStorage.getItem('token');
    return axios.post("https://nepal.sk8tech.io/wp-json/wp/v2/questionnaire",
    {
      title: "Questionnaire",
      status: "publish",
      fields: state.fields
    }, {
      headers:{ Authorization: "Bearer" + token }
    }).then((response) => {
    dispatch(addProgram(response.data.acf.days_per_week, response.data.acf.goals, response.data.acf.exercise_place));
    dispatch(prepareRehabData(response.data.acf.injury_management, response.data.acf.posture_correction));

    //dispatch(questionnaire(state));
  }).catch((error) => {
    console.log(error);
    if(error.response){
      dispatch(addError(error.response.data.message));
    }else{
      console.log(error);
      dispatch(addError("OOPs! Could not connect to the server."))
    }
  })
}
}


//Function to initialize the program after completion of the questionnaire
export function addProgram (days, goals, exercise_place) {
  return(dispatch: Function) => {
    let user_id = sessionStorage.getItem('user_id');
    let goalName;
    switch (goals) {
      case "1": goalName = "Muscle Gain"; break;
      case "2": goalName = "Fat Loss"; break;
      case "3": goalName = "Decrease Stress"; break;
      case "4": goalName = "Improve Posture"; break;
      case "5": goalName = "Increase Fitness"; break;
      default: goalName = "Please select the goal"
    }
    let jsonurl;
    if(exercise_place === "gym"){
        jsonurl = `./DataSources/Workout/Gym/${goalName.replace(' ', '')}/day${days}.json`;
    }else if(exercise_place === "home"){
        jsonurl = `./DataSources/Workout/Home/${goalName.replace(' ', '')}/day${days}.json`;
    }else{
      console.log("nothing found");
    }
      //fetch the list of exercise
      let token = sessionStorage.getItem('token');
      return axios.get(jsonurl)
      .then((res) => {
        return axios.post("https://nepal.sk8tech.io/wp-json/wp/v2/program",
        {
          status: "publish",
          fields: {
              user_id: user_id,
              program_name: goalName,
              days: days,
              exercises: res.data.exercises,
              progress: "1",
              difficult_level: "1",
              exercise_place: exercise_place,
          }
        }, {
          headers:{ Authorization: "Bearer" + token }
        }).then((response) => {
            return axios.post("https://nepal.sk8tech.io/wp-json/wp/v2/record",
            {
              status: "publish",
              fields: {
                program_id: response.data.id,
                training_goal: response.data.acf.program_name,
                user_id: response.data.acf.user_id
              }
            }, {
              headers:{ Authorization: "Bearer" + token }
            }).then((recordResponse) => {
                dispatch(success(true));
                dispatch(uploading(false));
                setTimeout(function(){
                  dispatch(success(false));
                },700);
            }).catch((error) => {
              console.log(error);
            }) // posting record
        }).catch((error) => {
          console.log(error);
          if(error.response){
            dispatch(addError(error.response.data.message));
          }else{
            console.log(error);
            dispatch(addError("OOPs! something went wrong."))
          }
        })// posting program
      }).catch((error)=> {
        console.log(error);
        if(error.response){
          dispatch(addError(error.response.data.message));
        }else{
          console.log(error);
          dispatch(addError("OOPs! something went wrong."))
        }
      })//reading json url
  }
}

export function addName (nick_name: string) {
  let name = nick_name.slice(0,1).toUpperCase() + nick_name.slice(1, nick_name.length)
  return {
    type: "ADD_NAME",
    payload: name
  }
}

export function addAge (age: Number) {
  return {
    type: "ADD_AGE",
    payload: age.toString()
  }
}
export function addGender (gender: String) {
  return {
    type: "ADD_GENDER",
    payload: gender
  }
}
export function addWeight (weight: Number) {
  return {
    type: "ADD_WEIGHT",
    payload: weight.toString()
  }
}

export function addExercisePlace (exercisePlace: String) {
  return {
    type: "ADD_EXERCISE_PLACE",
    payload: exercisePlace
  }
}

export function addDays (days_per_week: Number) {
  return {
    type: "ADD_DAYS",
    payload: days_per_week.toString()
  }
}

export function addGoals (training_goals: String) {
  return {
    type: "ADD_GOALS",
    payload: training_goals
  }
}

export function addInjuryManagement (injury_management: String) {
  return {
    type: "ADD_INJURY_MANAGEMENT",
    payload: injury_management
  }
}
export function addPostureCorrection (posture_correction: String) {
  return {
    type: "ADD_POSTURE_CORRECTION",
    payload: posture_correction
  }
}
export function addStress (stress: string) {
  return {
    type: "ADD_STRESS",
    payload: stress
  }
}
export function addProductivity (productivity: string) {
  return{
    type : "ADD_PRODUCITIVITY",
    payload: productivity
  }
}
export function addProductiveAfterExercise (productive_after_exercise) {
  return {
    type: "ADD_PRODCTIVE_AFTER_EXERCISE",
    payload: productive_after_exercise
  }
}

export function addWorkInjury (work_injury : string) {
  return {
    type: "ADD_WORK_INJURY",
    payload: work_injury
  }
}

export function addHealthFeeling (health_feeling: string) {
  return {
    type: "ADD_HEALTH_FEELING",
    payload: health_feeling
  }
}

export function addDailyActivity (daily_activity: string) {
  return {
    type: "ADD_DAILY_ACTIVITY",
    payload: daily_activity
  }
}

export function addCurrentActivity (current_activity: string) {
  return {
    type: "ADD_CURRENT_ACTIVITY",
    payload: current_activity
  }
}

export function getDataFromServer(data) {
  const action = {
    type: "DATA_FROM_SERVER",
    payload: data
  }
  return action;
}

export function getGoalFromServer(data) {
  const action = {
    type: "GET_GOAL_FROM_SERVER",
    payload: data
  }
  return action;
}

export function addError (errorMessage: string) {
  return {
    type: "ADD_ERROR",
    payload: errorMessage
  }
}
export function removeError () {
  return {
    type: "REMOVE_ERROR",
    payload: null
  }
}

export function uploading (loading: boolean) {
  return {
    type: "UPLOADING",
    payload: loading
  }
}
export function success (success: boolean) {
  return {
    type: "SUCESSFULLY_UPLOAD",
    payload: success
  }
}
