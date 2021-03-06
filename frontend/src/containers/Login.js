/* eslint-disable consistent-return */
/* eslint-disable react/sort-comp */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
import React, { Component } from "react";
import { Redirect, withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { customerLogin } from "../AuthenticationServices/authService";
import style from '../style/Login.module.css';

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      email: "",
      password: "",
      loading: false,
    };
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

  async handleLogin(e) {
    e.preventDefault();

    this.setState({
      loading: true,
    });

    this.form.validateAll();

    const { history, loginCustomer, location } = this.props;
    const { state } = location;
    const redirectUrl = state ? state.from.pathname : "/login";

    if (this.checkBtn.context._errors.length === 0) {
      const customer = await loginCustomer(this.state.email, this.state.password);
      if(customer.role){
        history.push({pathname:redirectUrl});
        this.setState({
          loading: false
        });
      } else {
        this.setState({
          loading: false,
        });
      }
      
    } else {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    const { loggedIn, message } = this.props;

    if (loggedIn) {
      return <Redirect to="/" />;
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
            onSubmit={this.handleLogin}
            ref={(c) => {
              this.form = c;
            }}
          >
            <div className="form-group">
              <label htmlFor="username">Email</label>
              <Input
                type="text"
                className="form-control"
                name="email"
                value={this.state.email}
                onChange={this.onChangeEmail}
                validations={[required]}
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
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <button
                className="btn btn-primary btn-block"
                disabled={this.state.loading}
              >
                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm" />
                )}
                <span>Login</span>
              </button>
              <p className='mt-3'>
                Need an account 
                {' '}
                <Link
                  name="signup"
                  to="/signup"
                  id="list-home-list"
                  data-toggle="list"
                  role="tab"
                  aria-controls="home"
                >
                  Sign up
                </Link>
              </p>
              <p className="mt-5 mb-3 text-muted">JaviCorp ?? 2021</p>
            </div>

            {message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
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

Login.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  loginCustomer: PropTypes.func.isRequired,
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
  loginCustomer: customerLogin,
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));