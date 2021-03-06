import React from 'react';
import {Flex, List} from 'antd-mobile';
import './Exercise.css';
// icons taken from http://iconfont.cn/
const Item = List.Item

const RecordList = (props) => {
  return(
    <div className="record-list">
      <List>
        {[...Array(parseInt(props.state.exerciseData.sets, 10))].map((value, key) => {
          return displayRecord(props, key);
        })}
      </List>
    </div>
  )
}

const displayRecord =(props, index) => {
  if(props.state.exerciseLog[index])
  {
    return(
      <div className="list-records" key={index}>
      {(props.state.exercisePlace==="gym") &&
      <Item>
        <Flex justify="between" className="list" style={{color:"black"}}>
          <span className="list-number">{index+1}</span>
          <Flex.Item><img className="no-copy"src={require('../../../Assets/Workout/Exercise/checkCircle.svg')} alt="check-circle"/></Flex.Item>
          <Flex.Item><div className="list-text"> {props.state.exerciseLog[index].weight} kgs * {props.state.exerciseLog[index].reps} {props.state.repsName}</div></Flex.Item>
          { (props.state.exerciseLog[index].weight * props.state.exerciseLog[index].reps === props.state.personalBest) &&
            <Flex.Item><img className="no-copy"src={require('../../../Assets/Workout/cup-icon.png')} alt="check-circle"/></Flex.Item>
          }
          { (props.state.exerciseLog[index].weight * props.state.exerciseLog[index].reps !== props.state.personalBest) &&
            <Flex.Item> </Flex.Item>
          }
        </Flex>
      </Item>
      }
      {(props.state.exercisePlace === "home") &&
      <Item>
        <Flex justify="between" className="list" style={{color:"black"}}>
          <span className="list-number">{index+1}</span>
          <Flex.Item><img className="no-copy"src={require('../../../Assets/Workout/Exercise/checkCircle.svg')} alt="check-circle"/></Flex.Item>
          <Flex.Item><div className="list-text"> {props.state.exerciseLog[index].reps} {props.state.repsName}</div></Flex.Item>
            <Flex.Item> </Flex.Item>

        </Flex>
      </Item>
      }

      </div>
    )
  }
  else if (props.state.exerciseLog.length === 0 && index === 0){
    return (
      <div className="list-records" key={index}>
      {(props.state.exercisePlace === "gym") && (
        <div>
        {props.state.prevData.weight ? (
          <Item>
            <Flex justify="between" className="list">
              <span className="list-number">{index+1}</span>
              <Flex.Item><div className="list-text"><span style={{color:"#cecece"}}>{props.state.prevData.weight}kgs *{props.state.prevData.reps} {props.state.repsName}</span></div></Flex.Item>
              <Flex.Item><span style={{color:"#cecece"}}>Previous</span></Flex.Item>
            </Flex>
          </Item>
        ):(
          <Item style={{backgroundColor:'#a2cf6e'}}>
            <Flex justify="between" className="list">
              <span className="list-number">{index+1}</span>
            </Flex>
          </Item>
        )}
        </div>
      )}
      {(props.state.exercisePlace === "home") && (
        <div>
        {props.state.prevData.weight &&
          <Item>
            <Flex justify="between" className="list">
              <span className="list-number">{index+1}</span>
              <Flex.Item><div className="list-text"><span style={{color:"#cecece"}}>{props.state.prevData.reps} {props.state.repsName}</span></div></Flex.Item>
              <Flex.Item><span style={{color:"#cecece"}}>Previous</span></Flex.Item>
            </Flex>
          </Item>
        }
        {!props.state.prevData.reps &&
          <Item style={{backgroundColor:'#a2cf6e'}}>
            <Flex justify="between" className="list">
              <span className="list-number">{index+1}</span>
            </Flex>
          </Item>
        }
        </div>
      )}

      </div>
    )
  }
  else if(props.state.exerciseLog.length === index){
    return(
        <div className="list-records" key={index}>
          <Item style={{backgroundColor:'#a2cf6e'}}>
            <Flex justify="between" className="list" >
              <span className="list-number">{index+1}</span>
            </Flex>
          </Item>
        </div>
    )
  }
  else if (props.state.exerciseLog.length ===0 && props.state.exerciseData.length === 0){
    return(
      <div className="list-records" key={index} >
        <Item style={{backgroundColor:'#a2cf6e'}}>
          <Flex justify="between" className="list">
            <span className="list-number">{index+1}</span>
          </Flex>
        </Item>
      </div>

    )
  }
  else{
    return(
      <div className="list-records" key={index} >
        <Item >
          <Flex justify="between" className="list">
          <span className="list-number">{index+1}</span>
          </Flex>
        </Item>
      </div>
    )
  }
}
export default RecordList;
