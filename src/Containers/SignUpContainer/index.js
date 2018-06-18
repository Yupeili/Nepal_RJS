import React, {Component} from 'react';
import SignUpWrapper from '../../Components/SignUp/';
import {connect} from 'react-redux';
import {SignUpActions, addUsername, addEmail, addPassword } from './action';
import {bindActionCreators} from 'redux';


class SignUpContainer extends Component{
  render(){
    const {username, email, password}= this.props.SignUpStates;
    return(
      <div>
        <SignUpWrapper
          username={username}
          email={email}
          password={password}
          onClickButton={this.props.SignUpActions}
          onChangeEmail={this.props.addEmail}
          onChangePassword={this.props.addPassword}
          onChangeUsername={this.props.addUsername}
        />
      </div>
    );
  }
}

function mapStateToProps(state){
   return {
     SignUpStates: state.SignUpReducersStates,
   }
}

function matchDispatchToProps(dispatch){
  return bindActionCreators({
    SignUpActions: SignUpActions,
    addUsername: addUsername,
    addEmail: addEmail,
    addPassword: addPassword,
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(SignUpContainer);