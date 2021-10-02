/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/forbid-prop-types */
import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/auth";
import navbar from '../style/NavBar.module.css'

class NavBar extends Component {
  handleLogoutClick = () => {
    this.props.logout();
    this.props.history.push("/home");
  };

  render(){
    const { loggedIn, customer } = this.props.auth;
    const {cookie} = this.props.coookie
    return (
      <nav className={`navbar ${navbar.navbaricontop} navbar-expand-lg navbar-dark bg-success`}>
        <a className="navbar-brand" href="#">Snooker eCommerce</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#">
                <i className={`fa fa-home ${navbar.icon}`} />
                Home
              </a>
            </li>
            <li className="nav-item active">
              <a className="nav-link" href="#">
                <i className={`fas fa-clipboard-list ${navbar.icon}`} />
                Categories
              </a>
            </li>
          </ul>
          <ul className="navbar-nav ">
            <li className="nav-item active">
              <a className="nav-link" href="#">
                <i className={`fas fa-shopping-cart ${navbar.icon}`}>
                  <span className="badge badge-warning">{Object.keys(cookie).length}</span>
                </i>
                Cart
              </a>
            </li>
            <li className="nav-item active">
              <a className="nav-link" href="#">
                <i className={`fab fa-twitter ${navbar.icon}`} />
              </a>
            </li>
            <li className="nav-item active">
              <a className="nav-link" href="#">
                <i className={`fab fa-facebook-square ${navbar.icon}`} />
              </a>
            </li>  
            {!loggedIn && ( 
              <>          
                <li className="nav-item active">
                  <a className="nav-link" href="#">
                    <i className={`fas fa-sign-in-alt ${navbar.icon}`} />
                    Login
                  </a>
                </li>
                <li className="nav-item active">
                  <a className="nav-link" href="#">
                    <i className={`fas fa-user-plus ${navbar.icon}`} />
                    Signup
                  </a>
                </li>
              </>
            )}
            {loggedIn && (
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <i className={`fas fa-id-card ${navbar.icon}`}>
                    <span className="badge badge-primary">11</span>
                  </i>
                  {customer.customer.username}
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a className="dropdown-item" href="#">Profile</a>
                  {customer.role === 'Role_Admin' && (
                    <a className="dropdown-item" href="#">Admin Panel</a>
                  )}
                  <div className="dropdown-divider" />
                  <a className="dropdown-item" href="#" onClick={this.handleLogoutClick}>Logout</a>
                </div>
              </li>
            )}
          </ul>
        </div>
      </nav>
    );
  };  
};

NavBar.propTypes = {
  auth: PropTypes.shape({
    loggedIn: PropTypes.bool,
    customer: PropTypes.object,
  }).isRequired,
  cookies: PropTypes.shape({
    cookie: PropTypes.object,
  }).isRequired,
};

const mapStateToProps = state => ({
  auth: {
    loggedIn: state.auth.loggedIn,
    customer: state.auth.customer,
  },
  cookies: {
    cookie: state.cookies.cookie
  }  
});

export default connect(mapStateToProps, { logout })(withRouter(NavBar));