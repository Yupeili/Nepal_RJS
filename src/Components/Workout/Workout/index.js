import React from 'react';
import {WingBlank, WhiteSpace, Button, Card} from 'antd-mobile';
import './Workout.css';
import { Link } from 'react-router-dom';

const Workout = (props) => {
    if(props.WorkoutReducers.dayIndex != null){
      let{dayIndex} = props.WorkoutReducers;
      return(
        <div className="container">
        <div className="workout-info">{props.WorkoutReducers.program.program_name} Workout</div>
          <div className="container-without-button">
            <div className= "image-container">
              <img className="image-source" src={require("../../../Assets/Workout/sampleImage.jpeg")} alt="header image"/>
            </div>

            {/*
            <WingBlank>
              <WhiteSpace size="lg"/>

              {props.WorkoutReducers.program.exercises[dayIndex].exercise_list.map((data,key) => (
                <div key={key} className="list-workout">
                  <span style = {{float: 'left', margin: "0 20px 0 0"}}>
                    <img src={require(`../../../Assets/WorkoutIcons/${key}.jpg`)} height="60px" width="100px" alt="work" />
                  </span>
                  {!data.is_saved && (
                    <span style = {{ float :'right'}}>
                      <span className="span-button keep" onClick={() => props.onWorkOutKeep(key)}> keep </span>
                      <WhiteSpace size="xs"/>
                      <span className="span-button change" onClick={() => props.onExerciseChange(key)}> change </span>
                    </span>
                  )}
                  {data.is_saved && (
                    <span style = {{ float :'right'}}>
                      <span className="span-button saved"> saved! </span>
                    </span>
                  )}
                  <span>
                    {data.workout}
                    <WhiteSpace />
                    {data.code}
                  </span>
                </div>
              ))}
              <WhiteSpace size="lg"/>
              </WingBlank>  */}

              {/* testing new UI format*/}
              <WingBlank size="lg">
                  {props.WorkoutReducers.program.exercises[dayIndex].exercise_list.map((data,key) => (
                    <div key={key}>
                    <WhiteSpace/>
                    <Card >
                      <Link to={`/exercise/${key}`} className="link-highlight">
                        <Card.Header
                          title={<span style={{whiteSpace:"nowrap"}}>{data.workout}</span>}
                          extra={<span>{data.code}</span>}
                        />
                      </Link>
                        <Card.Body style={{textAlign:"center"}}>
                          <img style={{borderStyle:"solid", borderColor:"#f5f5f9",borderWidth:"1px",borderRadius:"5px"}}src={require(`../../../Assets/WorkoutIcons/${key}.jpg`)} height="120px" width="200px" alt="work" />
                        </Card.Body>
                      <Card.Footer

                        content={<div>
                                {!data.is_saved && (
                                    <div style={{textAlign:"center"}}>
                                      <Button type="primary" size="omitted" inline onClick={() =>props.onWorkOutKeep(key)}>&nbsp;&nbsp;Keep&nbsp;&nbsp;</Button>
                                        &nbsp;&nbsp;&nbsp;&nbsp;
                                      <Button type="warning" size="omitted" inline onClick={() =>props.onExerciseChange(key)}>Change</Button>
                                      <WhiteSpace/>
                                    </div>
                                )}
                                {data.is_saved && (
                                    <div style={{textAlign:"center"}}>
                                      <Button type="primary" size="omitted" inline style={{ background: '#54D66A'}}>Saved!</Button>
                                      <WhiteSpace/>
                                    </div>
                                )}
                              </div>
                              }/>
                    </Card>
                    <WhiteSpace/>
                    </div>
                  ))}
              </WingBlank>
              </div>


            <div className="footer-botton">
            <WingBlank>
              <WingBlank>
                <Button type="primary" onClick={() => props.onStart()}>
                    Start your Workout
                </Button>
              </WingBlank>
            </WingBlank>
            </div>
        </div>//container
      )
    }else{
      return(
        <div> wait</div>
      )
    }
}

export default Workout;
