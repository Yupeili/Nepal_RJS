import React from 'react';
import { Checkbox, Flex } from 'antd-mobile';

const CheckboxItem = Checkbox.CheckboxItem;


const PostureCorrection = (props) => {
  return(
    <div>
      {props.heading !== "" && (
        <h2 style={{textAlign: 'center'}}>{props.heading}</h2>
      )}
      <div>
        <div className="listHeader">
          {props.title}
        </div>
        {props.data.map((i,key) => (
          <Flex key={key}>
            <Flex.Item>
              <div onClick = {() => i.value !==  0? props.showModal(i,'forPosture' ) : props.selectPostureCorrection(i.value)}>
                <CheckboxItem key={i.value} checked={props.fields === i.value}>
                  { i.description }
                </CheckboxItem>
              </div>
            </Flex.Item>
          </Flex>
          ))}
      </div>
    </div>
  )
}

export default PostureCorrection;
