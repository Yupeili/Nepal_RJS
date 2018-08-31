import axios from 'axios';

export function getProgram(){
  return(dispatch: Function) => {
    return axios.get("https://nepal.sk8tech.io/wp-json/wp/v2/program?filter[posts_per_page]=1")
    .then((response)=> {
      dispatch(setProgram(response.data[0].acf));
      dispatch(setProgramID(response.data[0].id));

      dispatch(setProgramName(response.data[0].acf.program_name));
      dispatch(setDays(response.data[0].acf.days));
      dispatch(setExercises(response.data[0].acf.exercises));
      dispatch(setProgress(response.data[0].acf.progress));
    }).catch((error)=> {
      console.log(error);
    })
  }
}

export function selectWorkout(index, workoutReducers, selectedExercise) {
    return(dispatch: Function) => {
      let token = localStorage.getItem('token');
      let id = workoutReducers.id;
      let { program } = workoutReducers;
      program.exercises[0].exercise_list[index].workout = selectedExercise.name;
      program.exercises[0].exercise_list[index].progression_model = selectedExercise.progression_model;
      dispatch(setProgram(program));
      return axios.post(`https://nepal.sk8tech.io/wp-json/wp/v2/program/${id}`,
        {
            status: "publish",
            fields: program
        }, {
          headers:{
            Authorization: "Bearer" + token
          }
        })
      .then((response)=> {
        dispatch(setProgram(response.data.acf));
      }).catch((error)=> {
        alert("error");
      })
    }
}

export function fetchWorkoutList(code) {
  let token = localStorage.getItem('token');
  return(dispatch: Function) => {
    return axios.get(`https://nepal.sk8tech.io/wp-json/wp/v2/exercise?filter[meta_key]=code&filter[meta_value]=${code}`)
    .then((response) => {
      dispatch(setWorkoutList(response.data[0].acf));
    }).catch((error) => {
      console.log(error);
    })
  }
}

export function keepWorkout(index, workoutReducers){
  let token = localStorage.getItem('token');
  return(dispatch: Function) => {
    let id = workoutReducers.id;
    let {program} = workoutReducers;
    program.exercises[0].exercise_list[index].is_saved = true;
    dispatch(setProgram(program));
    return axios.post(`https://nepal.sk8tech.io/wp-json/wp/v2/program/${id}`,
      {
          status: "publish",
          fields: program
      }, {
        headers:{
          Authorization: "Bearer" + token
        }
      })
    .then((response)=> {
      dispatch(setProgram(response.data.acf));
    }).catch((error)=> {
      console.log(error);
    })
  }
}

export function setWorkoutList ( listExercise: Object ) {
  return {
    type: "SET_WORKOUT_LIST",
    payload: listExercise
  }
}
export function  setProgram( program: Object){
  return {
    type: "SET_PROGRAM",
    payload: program
  }
}

export function setProgramID (id: Number) {
  return {
    type: "SET_PROGRAM_ID",
    payload: id
  }
}

export function setDayIndex ( dayIndex: Number) {
  return {
    type: "SET_DAY_iNDEX",
    payload: dayIndex
  }
}

export function setProgramName(goal: String){
  return {
    type: "SET_PROGRAM_NAME",
    payload: goal
  }
}
export function setDays(days: Number){
  return {
    type: "SET_DAYS",
    payload: days
  }
}
export function setExercises(exercises: Object) {
  return {
    type: "SET_EXERCISES",
    payload: exercises
  }
}
export function setProgress(progress: Number) {
  return {
    type: "SET_Progress",
    payload: progress
  }
}
