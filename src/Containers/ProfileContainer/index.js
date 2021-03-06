import React, {Component} from 'react';
import Profile from '../../Components/Profile'
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  changeName, changeBirthDate, changeHeight, changeWeight, changeEmail, changePassword, showPassError,
  getUserData, uploadPicture, removeError, updateName, updateBOD, updateWeight, updateHeight, updataPassword
} from './actions';
import { Toast } from 'antd-mobile'
import FooterContainer from '../Workout/FooterContainer';
import {checkLogout} from '../RootContainer/action'; //logout
import Modal from '../../Components/UI/Modal';
import ShowError from '../../Components/Error/ShowError';

class ProfileContainer extends Component{

  componentDidMount() {
    this.props.getUserData();
  }

  onLogoutHandler = () => {
    window.sessionStorage.clear();
    this.props.checkLogout();
  }

  cancelErrorMessageHandler =()=> {
    this.props.removeError();
  }
  render () {

    const heightArray = ArrtoObj(70, 270, "length");
    const weightArray = ArrtoObj(20, 300, "weight");
    const { nick_name, fields,error} = this.props.ProfileReducers;
    return (
      <div>
        <Profile
          fields={fields}
          //mydetails
          name={nick_name}
          heightArray={heightArray}
          weightArray={weightArray}
          nameHandler={this.props.changeName}
          selectHeight={this.props.changeHeight}
          selectWeight={this.props.changeWeight}
          selectBirthDate={this.props.changeBirthDate}
          uploadPicture={this.props.uploadPicture}
          //accountdetails
          selectEmail={this.props.changeEmail}
          onLogoutHandler={this.onLogoutHandler}
          checkField={this.checkField}
          updateName={this.props.updateName}
          updateBOD={this.props.updateBOD}
          updateWeight={this.props.updateWeight}
          updateHeight={this.props.updateHeight}
          updataPassword={this.props.updataPassword}
        />
        <FooterContainer currentPath='profile'/>
        {(error.hasError) && (
          <Modal modalFor='modal'>
            <ShowError
              error={error.message}
              cancel={this.cancelErrorMessageHandler}
              />
          </Modal>
        )}
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    ProfileReducers: state.ProfileReducers,
  }
}

function matchDispatchToProps(dispatch){
  return bindActionCreators({
    changeWeight,changeHeight,changeName,changeBirthDate,changeEmail,
    showPassError,changePassword,getUserData,uploadPicture,
    checkLogout,removeError,updateName,updateBOD, updateWeight,updateHeight,updataPassword
  }, dispatch
);
}


// initialise array, decide on the unit.
function ArrtoObj(RangeFrom: int, RangeTo: int, unit: string) {
  var returnArray = [];
  if (unit === "length") {
    for (let i = RangeFrom; i <= RangeTo; i++) {
      returnArray.push({value: i, label: i + " cm"})
    };
  } else if (unit === "weight") {
    for (let i = RangeFrom; i <= RangeTo; i++) {
      returnArray.push({value: i, label: i + " kg"})
    };
  } else {
    for (let i = RangeFrom; i <= RangeTo; i++) {
      returnArray.push({value: i, label: i})
    };
  }
  return returnArray;
}

export default connect (mapStateToProps, matchDispatchToProps)(ProfileContainer);
