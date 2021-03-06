// @flow
import React, { Component } from 'react';
import {Redirect} from 'react-router';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { ActivityIndicator } from 'antd-mobile';

import {selectFooter} from '../FooterContainer/actions';
import {keepWorkout, fetchWorkoutList, selectWorkout,
        setDayIndex, getExerciseRecord, setCurrentDay, removeError, settingCurrentDay
        } from '../actions';
import Workout from '../../../Components/Workout/Workout';
import SelectExercise from '../../../Components/Workout/SelectExercise';
import Modal from '../../../Components/UI/Modal';
import ShowError from '../../../Components/Error/ShowError';
import FooterContainer from '../FooterContainer';
import Loading from '../../../Components/Loading';
import Hoc from '../../../HOC/Hoc';

class WorkoutContainer extends Component{
  constructor(props){
    super(props);
    this.state = {
      isReady: false,
      showKeepOrChange: false,
      isChangeWorkout: false,
      backToPlan: false,
      startExcercies: false,
      exercisesIndex: null,
      count: 1,
    }
  }
  componentWillMount(){
    if(this.props.currentFooterTab!== 'workoutTab' ){
      this.props.selectFooter('workoutTab');
    }
    if(this.props.WorkoutReducers.program){
      this.props.settingCurrentDay(true);
      const {days, progress} = this.props.WorkoutReducers.program;
      const currentWeek = Math.ceil(parseInt(this.props.match.params.day,10) / days);
      const currentDay = parseInt(this.props.match.params.day,10) - ((currentWeek -1 ) * days)
      const dayIndex = this.props.WorkoutReducers.program.exercises.findIndex(i => { return i.day === currentDay.toString() })
      this.props.setDayIndex(dayIndex);
      this.props.setCurrentDay(parseInt(this.props.match.params.day, 10));
      if(progress === this.props.match.params.day && parseInt(progress,10) <= parseInt(days,10) ){
          this.setState({showKeepOrChange: true})
      }
      this.setState({isReady: true})
      setTimeout(() => {
        this.props.settingCurrentDay(false);
      }, 1500);
    }
  }
  //invokes when user click keep button
  onWorkOutKeepHandler = (index ) => {
    this.props.keepWorkout(index, this.props.WorkoutReducers);
  }
  //invokes when user click change button
  onChangeExerciseHandler = (index) => {
    this.setState({ isChangeWorkout: true, exercisesIndex: index })
     this.props.fetchWorkoutList(this.props.WorkoutReducers.program.exercises[0].exercise_list[index].code)
  }

  onSelectExerciseHandler = (exercise) => {
    this.props.selectWorkout(this.state.exercisesIndex, this.props.WorkoutReducers, exercise);
    this.setState({ isChangeWorkout: false })
  }
  onCancelSelectExerciseHandler = () => {
    this.setState({ isChangeWorkout: false })
  }

  onStartHandler = () => {
    this.setState({ startExcercies: true})
  }

  cancelChangeWorkout = () => {
    this.setState({ isChangeWorkout: false })
  }
  cancelErrorMessageHandler =() => {
    this.props.removeError();
  }
  render() {
    const {error} =this.props.WorkoutReducers;
    if(this.props.WorkoutReducers.program){
      if(this.state.isReady){
        let{dayIndex} = this.props.WorkoutReducers;

        if(dayIndex != null){
          const programExerciseList = this.props.WorkoutReducers.program.exercises[dayIndex].exercise_list;
          const programName = this.props.WorkoutReducers.program.program_name
          return (
            <Hoc>
            <Workout
            showKeepOrChange = {this.state.showKeepOrChange}
            onExerciseChange = {this.onChangeExerciseHandler}
            onWorkOutKeep = {this.onWorkOutKeepHandler}
            onStart = {this.onStartHandler}
            programExerciseList = {programExerciseList}
            programName = {programName}
            />
            <div>
                <ActivityIndicator
                  toast
                  text="Please Wait..."
                  animating={this.props.WorkoutReducers.isSettingCurrentDay}
                />
            </div>
            <div>
                <ActivityIndicator
                  toast
                  text="Saving..."
                  animating={this.props.WorkoutReducers.isClickedKeep}
                />
            </div>
            <div>
                <ActivityIndicator
                  toast
                  text="Updating exercise. Please wait.."
                  animating={this.props.WorkoutReducers.isSavingExercise}
                />
            </div>
            {(this.state.isChangeWorkout) && (
              <Modal modalFor = "modal-for-select-exercise">
              <SelectExercise
                onSelect = {this.onSelectExerciseHandler}
                listExercise = {this.props.WorkoutReducers.listExercise}
                programExerciseList = { programExerciseList }
                exerciseIndex = {this.state.exercisesIndex}
                cancel = {this.cancelChangeWorkout}
              />
              </Modal>
            )}
            {(error.hasError) && (
              <Modal modalFor='modal'>
                <ShowError
                 error={error.message}
                 cancel={this.cancelErrorMessageHandler}/>
              </Modal>
            )}
            {( this.state.startExcercies) && (
              <Redirect to="/exercise" />
            )}
            <FooterContainer currentPath='workout' />

            {(this.props.WorkoutReducers.redirectToQuestionnaire) && (
              <Redirect to='/questionnaire' />
            )}
          </Hoc>
        )
      }else{
        return(
          <Loading />
        )
      }
    }else{//if this.state.isReady is false
      return(
        <Hoc>
          {(this.props.WorkoutReducers.redirectToQuestionnaire) && (
            <Redirect to='/questionnaire' />
          )}

          <Loading />
        </Hoc>
      )
    }
  }else{
    return(
      <Redirect to= "/plan" />
    )
  }
}
}
function mapStateToProps(state){
  return {
    currentFooterTab: state.FooterReducers.currentFooterTab,
    WorkoutReducers: state.WorkoutReducers,
  }
}
function matchDispatchToProps(dispatch){
  return bindActionCreators({
    selectFooter, keepWorkout, fetchWorkoutList,
    selectWorkout, setDayIndex, getExerciseRecord, setCurrentDay,
    removeError, settingCurrentDay
  }, dispatch
);
}
export default connect(mapStateToProps, matchDispatchToProps) (WorkoutContainer);
