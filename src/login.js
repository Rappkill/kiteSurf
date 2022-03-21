import React, { Component } from 'react';
import Userfront from "@userfront/core";


// Initialize Userfront Core JS
Userfront.init("demo1234");


// Define the Login form component
class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      emailOrUsername: "",
      password: "",
      alertMessage:""
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setAlertMessage = this.setAlertMessage.bind(this);
  }

  handleInputChange(event) {
    event.preventDefault();
    const target = event.target;
    this.setState({
      [target.name]: target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setAlertMessage()

    Userfront.login({
      method: "password",
      emailOrUsername: this.state.emailOrUsername,
      password: this.state.password,
    }).catch((error) =>{
      this.setAlertMessage(error.message);
    });
  }


setAlertMessage(message) {
  this.setState( {alertMessage: message});
}

  render() {
    return (
      <div className='Login'>
        <Alert message={this.state.alertMessage} />
        <form onSubmit={this.handleSubmit}>
          <label>
            Username
            <input
              name="emailOrUsername"
              type="text"
              value={this.state.emailOrUsername}
              onChange={this.handleInputChange}
            />
          </label>
          <label>
            Password
            <input
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.handleInputChange}
            />
          </label>
          <button className='btn btn-secondary' type="submit">Log in</button>
        </form>
      </div>
    );
  }
}

class Alert extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
super(props) 
  }
  render() {
    if (!this.props.message) return "";
    return <div id="alert">{this.props.message}</div>;
  }
}


export default LoginForm;