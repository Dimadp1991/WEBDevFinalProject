import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
//import axios from 'axios';
import axios from '../../axios.config'
import './SignUp.css'

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      fullName: "",
      userName: "",
      email: "",
      password: "",
    };
    this.changeFullName = this.changeFullName.bind(this);
    this.changeUsername = this.changeUsername.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.onSubmit=this.onSubmit.bind(this);
  }

  changeFullName(event) {
    this.setState({
      fullName: event.target.value,
    });
  }

  changeUsername(event) {
    this.setState({
      userName: event.target.value,
    });
  }

  changeEmail(event) {
    this.setState({
      email: event.target.value,
    });
  }

  changePassword(event) {
    this.setState({
      password: event.target.value,
    });
  }

  onSubmit(event){

    event.preventDefault();

    const registered={
        fullName:this.state.fullName,
        userName:this.state.userName,
        email:this.state.email,
        password:this.state.password
    }
    axios.post('/register',registered)
    .then(res=>console.log(res.data))

 //  //show validation messages
  }

  render() {
    return (
        
      <div>
        <div className="container-md mt-4">
          <div className="form-div">
            <form onSubmit={this.onSubmit} id="register_form_div">
              <input
                type="text"
                placeholder="Full Name"
                onChange={this.changeFullName}
                value={this.state.fullName}
                className="form-control form-group"
              />

              <input
                type="text"
                placeholder="Username"
                onChange={this.changeUsername}
                value={this.state.username}
                className="form-control form-group"
              />

              <input
                type="email"
                placeholder="Email"
                onChange={this.changeEmail}
                value={this.state.email}
                className="form-control form-group"
              />
              <input
                type="password"
                placeholder="Password"
                onChange={this.changePassword}
                value={this.state.password}
                className="form-control form-group"
              />

              <input id="reg_button" type="submit" className="btn btn-success" value="Register" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;
