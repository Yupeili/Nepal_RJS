import React from 'react';
import { Icon, List, Checkbox, WhiteSpace} from 'antd-mobile';

const CheckboxItem = Checkbox.CheckboxItem;

const StepTwo = (props) => {
  return(
    <div>
    <h2 style={{textAlign: 'center'}}>Create Your Program</h2>
      <div style={{ float: 'right' }}>
        <span > <strong> Days :</strong> </span>
        &nbsp;&nbsp;
        <span>
          <button onClick={props.minus}>
          <Icon type="minus" style={{width:"12px", height: "12px"}}/>
          </button>&nbsp;
            <span>{props.days }</span>
            &nbsp;
          <button onClick={props.plus}>
          <Icon type="plus" style={{width:"12px", height: "12px"}}/>
          </button>
        </span>
      </div>
      <WhiteSpace/>
      <WhiteSpace/>
      <WhiteSpace/>
      <div>

        {props.data.map(i => (
          <CheckboxItem key={i.value} checked={i.isChecked} onChange={() => props.change(i.value)}>
            <strong>{i.label}</strong><List.Item.Brief>{i.description}</List.Item.Brief>
          </CheckboxItem>
        ))}
      </div>
    </div>
  )
}

export default StepTwo;