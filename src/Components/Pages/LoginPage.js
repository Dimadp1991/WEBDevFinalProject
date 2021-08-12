import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import $ from 'jquery'
import axios from '../../axios.config'
import './LoginPage.css'
import Cookies from 'universal-cookie';


class LoginPage extends Component {

  constructor() {

    super();
    this.state = {
      userName: "",
      password: "",
    };
    this.changeUsername = this.changeUsername.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }



  changeUsername(event) {
    this.setState({
      userName: event.target.value,
    });
    this.Sign_UpValidetion();
  }


  changePassword(event) {
    this.setState({
      password: event.target.value,
    });
    this.Sign_UpValidetion();
  }


  Sign_UpValidetion() {

    if ($('#name').val() === '') {
      $('#name_valid').text('Please fill UserName')
    }
    else {
      $('#name_valid').text('');
    }

    if ($('#password').val() === '') {
      $('#pass_valid').text('Please enter password');
    }
    else {
      $('#pass_valid').text('');
    }


  }


  onSubmit(event) {

    event.preventDefault();


    const LoginForm = {
      userName: this.state.userName,
      password: this.state.password
    }
    axios.post('/login', LoginForm)
      .then(res => {
        //console.log(res.data);
        const cookies = new Cookies();
        cookies.set('ID', res.data._id, { path: '/' });
        cookies.set('UserName', res.data.userName, { path: '/' });
        window.location.reload().then(() => this.props.history.push("/"));

      })
      .catch((err) => console.log(err))
    //show validation message

  }


  render() {
    const user_coockie = new Cookies();
    if (user_coockie.get('ID') != null) {
      this.props.history.push("/")
    }



    return (

      <div>
        <div className="container-md mt-4">
          <div className="form-div">
            <form onSubmit={this.onSubmit} id="register_form_div">

              <input
                id="name"
                type="text"
                placeholder="Username"
                onChange={this.changeUsername}
                value={this.state.username}
                className="form-control form-group"
              />
              <p className="_valid" id="name_valid"></p>
              <input
                id="password"
                type="password"
                placeholder="Password"
                onChange={this.changePassword}
                value={this.state.password}
                className="form-control form-group"
              />
              <p className="_valid" id="pass_valid"></p>
              <input id="reg_button" type="submit" className="btn btn-success" value="Login" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginPage;
