/* eslint-disable react/sort-comp */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable consistent-return */
import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import { Redirect, withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { customerSignup } from "../AuthenticationServices/authService";
import style from '../style/Signup.module.css';

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const email = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

class Signup extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      email: "",
      password: "",
      successful: false,
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  async handleRegister(e) {
    e.preventDefault();

    this.setState({
      successful: false,
    });

    this.form.validateAll();
    const {signup, history} = this.props;

    if (this.checkBtn.context._errors.length === 0) {
      const newCust = await signup(this.state.username, this.state.email, this.state.password);
      if (newCust.message.includes('successfully!')) {
        this.setState({
          successful: true,
        });
        setTimeout(() => {
          history.push('/login');
        }, 2500);        
      } 
    }
  }

  render() {
    const { loggedIn, message } = this.props;

    if (loggedIn) {
      return <Redirect to="/home" />;
    }

    return (
      <div className="col-md-12">
        <div className={`card ${style.cardcontainer} ${style.card2}`}>
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className={style.profileimgcard}
          />

          <Form
            onSubmit={this.handleRegister}
            ref={(c) => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="username"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                    validations={[required, vusername]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    validations={[required, email]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <Input
                    type="password"
                    className="form-control"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    validations={[required, vpassword]}
                  />
                </div>

                <div className="form-group">
                  <button className="btn btn-primary btn-block">Sign Up</button>
                </div>
                <p className='mt-3'>
                  Already have account 
                  {' '}
                  <Link
                    name="login"
                    to="/login"
                    id="list-home-list"
                    data-toggle="list"
                    role="tab"
                    aria-controls="home"
                  >
                    Log in
                  </Link> 
                </p>
              </div>
            )}

            {message && (
              <div className="form-group">
                <div className={this.state.successful ? "alert alert-success" : "alert alert-danger"} role="alert">
                  {message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={(c) => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
    );
  }
};

Signup.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  signup: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const { loggedIn } = state.auth;
  const { message } = state.message;
  return {
    loggedIn,
    message
  };
}

const mapDispatchToProps = dispatch => bindActionCreators({
  signup: customerSignup,
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Signup));