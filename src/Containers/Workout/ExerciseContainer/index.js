import React, {Component} from 'react';
import {Redirect} from 'react-router';
import { ActivityIndicator } from 'antd-mobile';
import Exercise from '../../../Components/Workout/Exercise/';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import Info from '../../../Components/Workout/Exercise/Info';
import ShowHistory from '../../../Components/Workout/Exercise/ShowHistory';
import Modal from '../../../Components/UI/Modal';
import {saveExerciseData, getExerciseRecord, updatePersonalBest, updateRepsAndWeight, updateReps,
        completeWorkout, savingExercise, removeError} from '../actions';
import Loading from '../../../Components/Loading';
import Hoc from '../../../HOC/Hoc';
import ShowError from '../../../Components/Error/ShowError';

// import _ from 'lodash';
// import YTSearch from 'youtube-api-search';
// const API_KEY = 'AIzaSyBv5Htzijr5-3WBHMU-N3V21Ez9yBb-6vY';
class ExerciseContainer extends Component{

  constructor(props){
    super(props);
    this.state={
      //videos:[],
      //selectedVideo:null,
      inCurrentProgress: true,
      exercisePlace: null, //represent the place of doing exercise either gym or home
      isFinish: false, // represent if the workout finsh for a day.
      isLoading: false, // represent the loading of data
      isInitializing: true,
      goBack: false, // represent if user click back button
      showHistory: false,
      showInfo: false, // represent if user click show info icon
      completedExercise: 0, // count the number of completed exercise
      exerciseIndex: 0, // store the index of current exercise
      exerciseLength: null, // represent the total number of workout for current day
      currentSets : 1, // represent the number of set user is currently in
      prescribeWeight: 0,
      prescribeReps: 0,
      personalBest: 0,
      weight: 0, // represent the prescribe weight for current workout
      reps: 0, // represent the prescribe reps for current workout
      sets: 0,
      repsName: "reps",
      repsTotalForHomeExercise: 0,
      exerciseData: {
      },
      prevData: {},
      exerciseLog:[], // represent the array of exercise log performed by the user
      error: false, // represent if there is any error occured
    };
    this.onChangeWeight = this.onChangeWeight.bind(this);
    this.onChangeRep = this.onChangeRep.bind(this);
    this.onSaveButtonHandler = this.onSaveButtonHandler.bind(this);
    this.onNextButtonHandler = this.onNextButtonHandler.bind(this);
    this.onHistoryButtonHandler = this.onHistoryButtonHandler.bind(this);
  }
  componentWillMount() {
    let index = 0;
    if(this.props.match.params.index){
      index = parseInt(this.props.match.params.index, 10);
      this.setState({exerciseIndex: index})
    }
    const {program, currentDay, dayIndex} = this.props.WorkoutReducers;
    if(program && dayIndex!== null){
      let exercisePlace = this.props.WorkoutReducers.program.exercise_place;
      this.setState({exercisePlace})
      if( parseInt(program.progress,10) !== currentDay){
        this.setState({inCurrentProgress: false})
      }
      //let exerciseLength = program.exercises[dayIndex].exercise_list.length;
      if(program.exercises[dayIndex].exercise_list[index]){
        this.calculateExerciseLog(index);
      }else{
        this.setState({ error: true})
      }
    }else{
      this.setState({ error: true})
    }
  }

  calculateExerciseLog = (i) => {
    let index = this.state.exerciseIndex;
    if(i!==null){
      index = i;
    }
    let exercisePlace = this.props.WorkoutReducers.program.exercise_place;
    let {program, dayIndex}= this.props.WorkoutReducers;
    let records = this.props.WorkoutReducers.record;
    //let week = this.props.WorkoutReducers.currentWeek;
    let day = this.props.WorkoutReducers.currentDay;
    let days_per_week = this.props.WorkoutReducers.program.days;
    let previous_week_day = parseInt(day,10) - parseInt(days_per_week,10);
    let exerciseData = program.exercises[dayIndex].exercise_list[index];
    let exerciseLength = program.exercises[dayIndex].exercise_list.length;
    let code = exerciseData.code;
    let workout = exerciseData.workout;
    let reps;
    let repsName = this.state.repsName;
    if(exercisePlace === "gym"){
      if(exerciseData.progression_model === "double progression"){
        if(exerciseData.reps === "Till Failure" || exerciseData.reps === "till failure"){
          reps = 8;
        }else{
          let temp = exerciseData.reps.split('-');
          reps = parseInt(temp[temp.length-1], 10);
        }
      }
      else if(exerciseData.progression_model === "linear") {
        reps = parseInt(exerciseData.reps, 10);
      }else if(exerciseData.progression_model === "no model"){
        let data = exerciseData.reps.split(" ");
        let tempData = data[0].split("-");
        reps = parseInt(tempData[1],10);
        repsName = [data[1]]
      }else{
        reps = 8;
      }
    }else if(exercisePlace === "home"){
      if(exerciseData.progression_model === "rep home"){
        reps = parseInt(exerciseData.reps, 10);
      }else if(exerciseData.progression_model === "time home"){
          let data = exerciseData.reps.split(" ");
          reps = parseInt(data[0],10);
          repsName = data[1];
      }else if(exerciseData.progression_model === "no progression"){
        let data = exerciseData.reps.split(" ");
        let tempData = data[0].split("-");
        reps = parseInt(tempData[1],10);
        repsName = [data[1]]
      }else if(exerciseData.progression_model === "till failure"){
        reps = 1;
      }else if(exerciseData.progression_model === "none"){
        reps = 1;
      }
      //write logic for home exercise place
    }
    this.setState({
      exerciseLength: exerciseLength, exerciseData, personalBest: parseFloat(exerciseData.personal_best),
      prescribeWeight: parseFloat(exerciseData.weight), prescribeReps: reps,
      weight: parseFloat(exerciseData.weight), reps: reps, repsName: repsName,
      sets: parseInt(exerciseData.sets, 10)
    })

    if(records){
      if(records.daily_record){
        let dayIndex = (records.daily_record.findIndex(i => { return i.day === day.toString()}));
        if(dayIndex >= 0){
          let dataIndex = (records.daily_record[dayIndex].data.findIndex( i => {return i.code === code && i.name === workout}));
          if(dataIndex >= 0){
            let exerciseLog = records.daily_record[dayIndex].data[dataIndex].data;
            this.setState({exerciseLog: exerciseLog, currentSets: exerciseLog.length+1})
          }
        }
        let prev_week_index = (records.daily_record.findIndex(i => { return i.day === previous_week_day.toString()}));
        if(prev_week_index >= 0){
          let prev_week_data_index = (records.daily_record[prev_week_index].data.findIndex( i => {return i.code === code}));
          if(prev_week_data_index >= 0){
            let last_data_index = records.daily_record[prev_week_index].data[prev_week_data_index].data.length - 1;
            let prevData = records.daily_record[prev_week_index].data[prev_week_data_index].data[last_data_index];
            this.setState({prevData: prevData})
          }
        }
      }
    }
    setTimeout(() => {
      this.setState({isInitializing:false, isLoading: false})
    }, 1000);
  }

  onNextButtonHandler = () => {
    // let {program, dayIndex}= this.props.WorkoutReducers;
    // program.exercises[dayIndex].exercise_list[this.state.exerciseIndex];
    let exerciseIndex;
    if(this.state.exerciseIndex === (this.state.exerciseLength - 1)){
      exerciseIndex = 0;
    }else{
      exerciseIndex = this.state.exerciseIndex +1;
    }
    const prevData = {};
    const exerciseLog = [];
    this.setState({prevData, exerciseLog, isLoading: true, completedExercise: this.state.completedExercise+1});
    this.setState({ currentSets: 1, exerciseIndex })
    this.calculateExerciseLog(exerciseIndex);
  }


  onSaveButtonHandler = () => {
    this.props.savingExercise(true);
    if(this.state.exercisePlace === "home"){
      this.homeExerciseSave();
    }else if(this.state.exercisePlace === "gym"){
      this.gymExerciseSave();
    }
  }

  gymExerciseSave = () => {
    let name = this.state.exerciseData.workout;
    let code = this.state.exerciseData.code;
    let variation = this.state.reps - this.state.prescribeReps;
    let weight = this.state.prescribeWeight;
    let total = this.state.weight * this.state.reps;
    let {program, dayIndex, programID} = this.props.WorkoutReducers;
    let {record, recordID, currentDay} = this.props.WorkoutReducers;

    if(this.state.exerciseData.progression_model === "linear") {
      switch (variation) {
        case -7: weight -= 10; break;
        case -6: weight -= 7.5; break;
        case -5: weight -= 7.5; break;
        case -4: weight -= 5; break;
        case -3: weight -= 5; break;
        case -2: weight -= 2.5; break;
        case -1: weight -= 2.5; break;
        case 2: weight += 2.5; break;
        case 3: weight += 2.5; break;
        case 4: weight += 5; break;
        case 5: weight += 5; break;
        case 6: weight += 5; break;
        case 7: weight += 7.5; break;
        default:
      }
    }
    this.setState({ weight, prescribeWeight: weight, reps: this.state.prescribeReps})
    if(total > this.state.personalBest){
      this.setState({personalBest: total})
      //write action to update personal best for given excercise
      this.props.updatePersonalBest(program, programID, dayIndex, this.state.exerciseIndex, total);
    }
    this.props.saveExerciseData(recordID, currentDay, name, code, this.state.repsName, this.state.weight, this.state.currentSets, this.state.reps, record);

    if(this.state.sets === this.state.currentSets){
      this.props.updateRepsAndWeight(program, programID, dayIndex, this.state.exerciseIndex, this.state.prescibeReps, this.state.prescribeWeight);
    }
    this.settingExerciseLogAfterSave();
  }

  homeExerciseSave = () => {
    let name = this.state.exerciseData.workout;
    let code = this.state.exerciseData.code;
    //let {program, programID} = this.props.WorkoutReducers;
    let {record, recordID, currentDay} = this.props.WorkoutReducers;

    this.props.saveExerciseData(recordID, currentDay, name, code, this.state.repsName, 0, this.state.currentSets, this.state.reps, record);
    if(this.state.exerciseData.progression_model==="rep home" || this.state.exerciseData.progression_model==="time home"){
      let repsTotal = this.state.repsTotalForHomeExercise + this.state.reps;
      if(this.state.sets === this.state.currentSets){
        if(repsTotal >= (this.state.sets * this.state.prescribeReps)){
          let {program, dayIndex, programID} = this.props.WorkoutReducers;
          let updatedReps = this.state.prescribeReps;
          if(this.state.exerciseData.progression_model==="rep home"){
             updatedReps += 5;
          }else{
             updatedReps += 10;
          }
          this.props.updateReps(program, programID, dayIndex, this.state.exerciseIndex, updatedReps);
        }
          this.setState({repsTotalForHomeExercise: 0})
      }else{
        this.setState({repsTotalForHomeExercise: repsTotal})
      }
    }
    this.settingExerciseLogAfterSave();
  }

  settingExerciseLogAfterSave = () => {
    //compare if its last exercise and last sets
    if(this.state.completedExercise===this.state.exerciseLength-1 && this.state.currentSets === this.state.sets){
      this.setState({completedExercise: this.state.completedExercise+1});
    }
    let exerciseLog = [...this.state.exerciseLog];
    /*
      Splice function doesnot need when user save all three sets at a go.
      But when user save one sets and close the app and visit later and while saving for second set,
      there is unexpected addition value appended to the log file. So this splice function used to delete those unexpected data
    */
    exerciseLog.splice((this.state.currentSets-1), 1);
    exerciseLog.push({weight:this.state.weight.toString(), reps:this.state.reps.toString(), sets: this.state.currentSets.toString()});
    this.setState({exerciseLog, currentSets : this.state.currentSets+1})
  }

  onChangeWeight = (val) => {
    this.setState({ weight: val });
  }

  onChangeRep = (val) => {
    this.setState({ reps: val });
  }
  onLeftClick(e){
    e.preventDefault();
    alert(e)
  }
  onHistoryButtonHandler = (e) => {
    e.preventDefault();
    this.setState({showHistory: !this.state.showHistory})
  }

  backButtonHandler = (e) => {
    e.preventDefault();
    this.setState({ goBack: true})
  }
  onCompleteButtonHandler = () => {
    let {programID} = this.props.WorkoutReducers;
    this.props.completeWorkout(programID);
    this.setState({ isFinish: true})
  }
  //Handles when user click info button
  infoHandler = (e) => {
    e.preventDefault();
    this.setState({ showInfo: !this.state.showInfo})
  }
  cancelErrorMessaegHandler = () => {
    let exerciseLog = [...this.state.exerciseLog];
    exerciseLog.splice((exerciseLog.length-1), 1);
    this.setState({exerciseLog, currentSets: this.state.currentSets-1})
    this.props.removeError();
  }

  checkCompleteProgress = () => {
    const {finish_for_day} = this.props.WorkoutReducers.program;
    if(finish_for_day && this.state.isFinish){
      return(
        <Redirect to="/plan" />
      )
    }
  }

  setMessage =()=> {
    let message = "";
    if(this.state.currentSets <= this.state.sets){
      if(this.state.exerciseData.progression_model === 'linear'){
        if(this.state.currentSets === this.state.sets){
          message = `Last set! Do as many reps as possible with ${this.state.prescribeWeight}kg`;
        }else{
          message = `Set ${this.state.currentSets} - Aim for ${this.state.prescribeWeight} * ${this.state.prescribeReps}`;
        }
      }else if(this.state.exerciseData.progression_model === 'double progression'){
        if(this.state.currentSets === this.state.sets){
          message = `Last Set - Do as many reps as possible`;
        }else if(this.state.currentSets === 1){

          if(this.state.prevData.reps){
            if(this.state.prescribeReps <= this.state.prevData.reps){
              message = `Increase the weight`;
            }else{
              message = `Aim for more reps`;
            }
          }
        }else{
          if(this.state.exerciseLog[this.state.exerciseLog.length-1].reps){
            if(this.state.prescribeReps <= this.state.exerciseLog[this.state.exerciseLog.length-1].reps){
              message = `Increase the weight`;
            }else{
              message = `Aim for more reps`;
            }
          }
        }
      }else if(this.state.exerciseData.progression_model === 'till failure'){
        message = `Do as many reps as possible`;
      }else{//for home workout
        if(this.state.currentSets === this.state.sets){
            message = `Last set! Do as many reps as possible`;
        }else{
          message = "";
        }
      }
    }else{
      message = "Go no next workout"
    }
    return message;
  }

  render(){
    let {error} =this.props.WorkoutReducers;
    let message = this.setMessage();
    if(this.props.WorkoutReducers.program && this.state.error === false){
      const {isSavingExercise} = this.props.WorkoutReducers;
      const videoDescription = "THIS is test video description";
      //const videoSearch = _.debounce((term)=>{this.videoSearch(term)}, 300);
      // const {exerciseName,exerciseNumber,exerciseTotal,sets,reps,weight,video,videoDescription,exerciseLog} =  this.props.ExerciseReducers;

      return(
        <div className="all">
        {this.state.isLoading === true &&
          (
            <Hoc><Modal modalFor = "modal-for-loading"><Loading mode="selectExercise"/></Modal></Hoc>
          )
        }
        <Exercise
        onBackButtonClicked ={this.backButtonHandler}
        onCompleteButtonHandler ={this.onCompleteButtonHandler}
        onSaveButtonClicked ={this.onSaveButtonHandler}
        onNextButtonHandler = { this.onNextButtonHandler }
        onHistoryButtonHandler = {this.onHistoryButtonHandler}
        onChangeWeight={this.onChangeWeight}
        onChangeRep={this.onChangeRep}
        onInfoClicked = {this.infoHandler}
        message = {message}
        /*videos={this.state.selectedVideo}*/
        state = {this.state}
        />
        <div>
            <ActivityIndicator
              toast
              text="initializing..."
              animating={this.state.isInitializing}
            />
        </div>
        <div>
            <ActivityIndicator
              toast
              text="Saving data to backend. Please wait.."
              animating={isSavingExercise}
            />
        </div>
        {this.state.goBack && (
          <Redirect to='/plan' />
        )}
        {this.state.showHistory && (
          <Modal modalFor = "modal-for-info">
            <ShowHistory
              name = {this.state.exerciseData.workout}
              record = {this.props.WorkoutReducers.record}
              exercisePlace = {this.state.exercisePlace}
              onBackButtonClicked = {this.onHistoryButtonHandler}
            />
          </Modal>
        )}
        {this.state.showInfo && (
          <Modal modalFor = "modal-for-info">
          <Info
            onBackButtonClicked = {this.infoHandler}
            exerciseData = {this.state.exerciseData}
            videoDescription = {videoDescription}
          />
          </Modal>
        )}
        {(error.hasError) && (
          <Modal modalFor='modal'>
            <ShowError
              error={error.message}
              cancel={this.cancelErrorMessaegHandler}
            />
          </Modal>
        )}
        {this.checkCompleteProgress()}
        </div>
      );
    }else{
      return (
        <Redirect to="/plan" />
      )
    }
  }


  /*videoSearch(term){
  YTSearch({key: API_KEY, term: term}, (videos)=>{
  this.setState({
  videos: videos,
  selectedVideo: videos[0],
});
})
}*/
}

function mapStateToProps(state){
  return {
    WorkoutReducers: state.WorkoutReducers,
  }
}

function matchDispatchToProps(dispatch){
  return bindActionCreators({
    saveExerciseData, getExerciseRecord, updatePersonalBest,
    updateRepsAndWeight, updateReps, completeWorkout,removeError, savingExercise
  }, dispatch
);
}

export default connect (mapStateToProps, matchDispatchToProps)(ExerciseContainer);
