import React from 'react';
import {Flex, List} from 'antd-mobile';
import './RecordList.css';
// icons taken from http://iconfont.cn/
const Item = List.Item

const displayRecord =(props, index) => {
    if(props.state.exerciseLog[index])
    {
      return(
        <div className="list-records">
        <Item key={index}>

            <Flex justify="between" className="list" style={{color:"black"}}>

              {index+1}

              <Flex.Item><img className="no-copy"src={require('../../../Assets/Workout/Exercise/checkCircle.svg')} alt="check-circle"/></Flex.Item>
              <Flex.Item><div className="list-text"> {props.state.exerciseLog[index].weight} kgs * {props.state.exerciseLog[index].reps} reps</div></Flex.Item>
              { (props.state.exerciseLog[index].weight * props.state.exerciseLog[index].reps === props.state.personalBest) &&
                <Flex.Item><img className="no-copy"src={require('../../../Assets/Workout/cup-icon.png')} alt="check-circle"/></Flex.Item>
              }
              { (props.state.exerciseLog[index].weight * props.state.exerciseLog[index].reps !== props.state.personalBest) &&
                <Flex.Item> </Flex.Item>
              }

            </Flex>

          </Item>
            </div>
      )
    }
    else if (props.state.exerciseLog.length === 0 && index === 0){
        return (
            <div className="list-records">
              <Item>

              {props.state.prevData.weight &&
                <Flex justify="between" className="list">
                   {index+1}
                  <Flex.Item><div className="list-text"><span style={{color:"#cecece"}}>{props.state.prevData.weight}kgs *{props.state.prevData.reps}reps</span></div></Flex.Item>
                  <Flex.Item><span style={{color:"#cecece"}}>Previous</span></Flex.Item>
                  </Flex>
              }

              {!props.state.prevData.weight &&
                <Flex justify="between" className="list">
                   {index+1}
                  </Flex>
              }

              </Item>
            </div>
            )
    }
    else if(props.state.exerciseLog.length === index){
      return(
             <div className="list-records">
                <Item style={{backgroundColor:'#a2cf6e'}}>
                  <Flex justify="between" className="list">
                    {index+1}
                  </Flex>
                </Item>
            </div>
          )
    }
    else{
      return(
            <div className="list-records">
                <Item>
                  <Flex justify="between" className="list">
                    {index+1}
                  </Flex>
                </Item>
            </div>
          )
    }
    // {props.state.exerciseLog.map((v, k) => (
    //   <Item key={k}>
    //       <Flex justify="between" className="list" style={{color:"grey"}}>
    //         <Flex.Item><img className="no-copy"src={require('../../../Assets/Workout/Exercise/checkCircle.svg')} alt="check-circle"/></Flex.Item>
    //         <Flex.Item><div className="list-text"> {props.state.exerciseLog[index].weight} kg * {props.state.exerciseLog[index].reps} reps</div></Flex.Item>
    //         { (props.state.exerciseLog[index].weight * props.state.exerciseLog[index].reps === props.state.personalBest) &&
    //           <Flex.Item><img className="no-copy"src={require('../../../Assets/Workout/cup-icon.png')} alt="check-circle"/></Flex.Item>
    //         }
    //       </Flex>
    //     </Item>
    //  ) )}
}

const RecordList = (props) => {
      return(
        <div className="record-list">
          <div className="list-text">
       <List>
        {[...Array(parseInt(props.state.exerciseData.sets,10))].map((value, key) =>(
            displayRecord(props, key)
        ))}
            </List>
          </div>
        </div>
      )
}
export default RecordList;
