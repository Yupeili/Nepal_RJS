import axios from 'axios';

//This function used to initialize the program to the redux during loading plan page
export function getProgram(){
  return(dispatch: Function) => {
    return axios.get("https://nepal.sk8tech.io/wp-json/wp/v2/program?filter[posts_per_page]=1")
    .then((response)=> {
      const progress = response.data[0].acf.progress;
      const days = response.data[0].acf.days;
      const currentWeek = Math.ceil(progress / days);
      const currentDay = progress - ((currentWeek -1 ) * days)
      dispatch(setProgram(response.data[0].acf));
      dispatch(setProgramID(response.data[0].id));
      dispatch(setCurrentWeek(currentWeek));
      dispatch(setCurrentDay(currentDay));

    }).catch((error)=> {
      console.log(error);
    })
  }
}

export function getExerciseRecord(programID){
  return(dispatch: Function) => {
    return axios.get(`https://nepal.sk8tech.io/wp-json/wp/v2/record?filter[meta_key]=program_id&filter[meta_value]=${programID}`)
    .then((response) => {
      console.log(response);
      dispatch(setExerciseRecord(response.data[0].acf));
      dispatch(setExerciseID(response.data[0].id))
    }).catch((error)=> {
      console.log(error);
    })
  }//end return dispatch function
}

//This function use to update the program when user change the workout
export function selectWorkout(listIndex, workoutReducers, selectedExercise) {
  return(dispatch: Function) => {
    let token = localStorage.getItem('token');
    let id = workoutReducers.programID;
    let { program, dayIndex } = workoutReducers;
    program.exercises[dayIndex].exercise_list[listIndex].workout = selectedExercise.name;
    program.exercises[dayIndex].exercise_list[listIndex].progression_model = selectedExercise.progression_model;
    dispatch(setProgram(program));
    dispatch(setWorkoutList(null));
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

  //This function is to fetch the list of available workout
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

  //This function update the server when user select keep button in workout
  export function keepWorkout(listIndex, workoutReducers){
    let token = localStorage.getItem('token');
    return(dispatch: Function) => {
      let id = workoutReducers.programID;
      let {program, dayIndex} = workoutReducers;
      program.exercises[dayIndex].exercise_list[listIndex].is_saved = true;
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

    export function saveExerciseData(recordID, week, day, code, weight, sets, reps, record) {
      return(dispatch: Function) => {
        console.log("Save exercise Data", record);
        let weekly_record = [];
        let temp;
        if(record.weekly_record){
          weekly_record = record.weekly_record;
          let weekIndex = weekly_record.findIndex( i => { return i.week ===  week.toString() });
          if(weekIndex >= 0){
            console.log("weekly_record",record.weekly_record);
            let dayIndex = record.weekly_record[weekIndex].daily_record.findIndex( i => { return i.day === day.toString() });
            if(dayIndex >= 0){
              let dataIndex = record.weekly_record[weekIndex].daily_record[dayIndex].data.findIndex( i => { return i.code === code.toString() });
              if(dataIndex >= 0){
                temp = { sets: sets, reps: reps, weight: weight }
                weekly_record[weekIndex].daily_record[dayIndex].data[dataIndex].data.push(temp);
              }else{//dataIndex >= 0
                temp = {code: code, data: [ { sets: sets, reps: reps, weight: weight }]}
                weekly_record[weekIndex].daily_record[dayIndex].data.push(temp);

              }
            }else{//dayIndex >= 0
              temp = {day: day, data: [ {code: code, data: [
                { sets: sets, reps: reps, weight: weight }]}]}
                weekly_record[weekIndex].daily_record.push(temp);
              }
            }else{ //weekIndex >= 0
              temp = { week: week, daily_record:[ {day: day, data: [ {code: code, data: [
                { sets: sets, reps: reps, weight: weight }]}]}]}
                console.log("before push", weekly_record);
                weekly_record.push(temp);
                console.log("temp added", weekly_record);
              }
            }else{
              let weekly_record = [{ week: week, daily_record:[ {day: day, data: [ {code: code, data: [
                { sets: sets, reps: reps, weight: weight }]}]}]}
              ]
            }
            return axios.post(`https://nepal.sk8tech.io/wp-json/wp/v2/record/${recordID}`,
              {
                status: "publish",
                fields: {
                  weekly_record: weekly_record
                }
              })
              .then((response)=> {
                  console.log(response.data);
                  dispatch(setExerciseRecord(response.data.acf));
              }).catch((error)=> {
                console.log(error);
              })
          }//ends return dispatch
        }//ends functions saveExerciseData



        export function setCurrentWeek ( currentWeek: Number) {
          return {
            type: "SET_CURRENT_WEEK",
            payload: currentWeek
          }
        }

        export function setCurrentDay ( currentDay: Number) {

          return {
            type: "SET_CURRENT_DAY",
            payload: currentDay
          }
        }

        //This funciton is used to store the dayIndex which is used when user click select.
        export function setDayIndex ( dayIndex: Number) {
          return {
            type: "SET_DAY_iNDEX",
            payload: dayIndex
          }
        }

        //This function is used to list the current exercise list while user want to change workout.
        export function setWorkoutList ( listExercise: Object ) {
          return {
            type: "SET_WORKOUT_LIST",
            payload: listExercise
          }
        }

        //This function is to set the program
        export function setProgram( program: Object){
          return {
            type: "SET_PROGRAM",
            payload: program
          }
        }

        //This function is to set ID for the program
        export function setProgramID (id: Number) {
          return {
            type: "SET_PROGRAM_ID",
            payload: id
          }
        }

        export function setExerciseRecord(record: Object) {
          return {
            type: "SET_EXERCISE_RECORD",
            payload: record
          }
        }

        export function setExerciseID(id: Number) {
          return {
            type: "SET_EXERCISE_ID",
            payload: id
          }
        }
