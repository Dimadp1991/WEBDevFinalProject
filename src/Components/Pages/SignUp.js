import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import $ from 'jquery';
//import axios from 'axios';
import axios from '../../axios.config';
import './SignUp.css';
import Cookies from 'universal-cookie';
import history from '../../history';
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
    this.onSubmit = this.onSubmit.bind(this);

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
    //validetion

    this.Sign_UpValidetion();

  }

  changeEmail(event) {
    this.setState({
      email: event.target.value,
    });
    //validetion

    this.Sign_UpValidetion();

  }

  changePassword(event) {
    this.setState({
      password: event.target.value,
    });

    this.check_pass_Strength();
    //validetion

    this.Sign_UpValidetion();

  }






  isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  }

  isStrongPass(pass) {
    var strong_pass = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/;
    return strong_pass.test(pass);
  }
  isMediumPass(pass) {
    var medium_pass = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/;
    return medium_pass.test(pass);
  }

  check_pass_Strength() {
    if ($('#password').val() !== '') {
      if (this.isMediumPass($('#password').val()) === true) {
        $('#weak_div').css('opacity', '1');
        $('#medium_div').css('opacity', '1');
        $('#weak_pass_mess').text('');
        // console.log("MID");
        if (this.isStrongPass($('#password').val()) === true) {
          $('#strong_div').css('opacity', '1');
          // console.log("STRONG");
          return true;
        }
        return true;
      }
      else {
        // console.log("WEAK");
        $('#weak_div').css('opacity', '1');
        return false;
      }


    }
    else {
      $('#strong_div').css('opacity', '0');
      $('#medium_div').css('opacity', '0');
      $('#weak_div').css('opacity', '0');
    }
  }

  Sign_UpValidetion() {

    if ($('#name').val() === '') {
      $('#name_valid').text('Please fill UserName')
    }
    else {
      $('#name_valid').text('');
    }

    if ($('#email').val() === '') {
      $('#email_valid').text('Please fill email')
    }
    else {
      //console.log(isEmail($('#email').val()));
      if (this.isEmail($('#email').val()) === false) {
        $('#email_valid').text('Please enter a valid email');
      }
      else {
        $('#email_valid').text('');
      }
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

    const registered = {
      fullName: this.state.fullName,
      userName: this.state.userName,
      email: this.state.email,
      password: this.state.password
    }




    const LoginForm = {
      userName: registered.userName,
      password: registered.password
    }
    axios.post('/register', registered)
      .then(res => {
        console.log(res.data)
      }).then(res => {
        axios.post('/login', LoginForm)
          .then(res => {
            //console.log(res.data);
            const cookies = new Cookies();
            cookies.set('ID', res.data._id, { path: '/' });
            cookies.set('UserName', res.data.userName, { path: '/' });
            history.push('/');
            window.location.reload();

          })
          .catch((err) => console.log(err))



      })


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
                id="name"
                type="text"
                placeholder="Username"
                onChange={this.changeUsername}
                value={this.state.username}
                className="form-control form-group"
              />
              <p className="_valid" id="name_valid"></p>
              <input
                id="email"
                type="email"
                placeholder="Email"
                onChange={this.changeEmail}
                value={this.state.email}
                className="form-control form-group"
              />
              <p className="_valid" id="email_valid"></p>
              <input
                id="password"
                type="password"
                placeholder="Password"
                onChange={this.changePassword}
                value={this.state.password}
                className="form-control form-group"
              />
              <p className="_valid" id="pass_valid"></p>
              <input id="reg_button" type="submit" className="btn btn-success" value="Register" />
            </form>
          </div>
          <div id="error-message" className="mt-3 text-danger"></div>
          <h4>Password Strength</h4>
          <div id="weak_div"> weak</div>
          <div id="medium_div">medium</div>
          <div id="strong_div">strong</div>
        </div>
      </div>
    );
  }
}

export default SignUp;
