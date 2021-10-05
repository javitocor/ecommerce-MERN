/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/role-supports-aria-props */
/* eslint-disable react/button-has-type */
/* eslint-disable react/sort-comp */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/forbid-prop-types */
import React, { Component } from "react";
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { customerLogout } from "../AuthenticationServices/authService";
import {getCookieData} from '../actions/cookies';
import navbar from '../style/NavBar.module.css'

class NavBar extends Component {
  handleLogoutClick = () => {
    this.props.logout();
    this.props.history.push("/");
  };

  componentDidMount() {
    const {getCart} = this.props;
    getCart('cart')
  }

  render(){
    const { loggedIn, customer } = this.props.auth;
    const {cookie} = this.props.cookies;
    return (
      <header>
        <nav className={`navbar navbar-expand-lg navbar-dark bg-dark ${navbar.top}`}>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample08" aria-controls="navbarsExample08" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse justify-content-md-center" id="navbarsExample08">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <i className="fab fa-facebook-f" />
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#"><i className="fab fa-twitter" /></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#"><i className="fab fa-instagram" /></a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="http://example.com" id="dropdown08" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Select Language</a>
                <div className="dropdown-menu" aria-labelledby="dropdown08">
                  <a className="dropdown-item" href="#">English</a>
                  <a className="dropdown-item" href="#">Japanese</a>
                  <a className="dropdown-item" href="#">Vietnamese</a>
                </div>
              </li>
            </ul>
          </div>
        </nav>
        <nav className="navbar navbar-expand-lg navbar-dark bg-info">
          <a className="navbar-brand" href="#">eCommerce</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link
                  to='/'
                  className="nav-link"
                  id="list-home-list"
                  data-toggle="list"
                  role="tab"
                  aria-controls="home"
                >
                  <i className={`fa fa-home ${navbar.icon}`} />
                  Home
                </Link>
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
                <Link
                  to='/cart'
                  className="nav-link"
                  id="list-cart-list"
                  data-toggle="list"
                  role="tab"
                  aria-controls="cart"
                >
                  <span id={navbar.lblCartCount} className={`badge badge-warning position-absolute ${navbar.badge2}`}>{cookie ? Object.keys(cookie).length : 0}</span>
                  <i className={`fas fa-shopping-cart ${navbar.icon}`} />
                  Cart
                </Link>
              </li> 
              {!loggedIn && ( 
              <>          
                <li className="nav-item active">
                  <Link
                    to='/login'
                    className="nav-link"
                    id="list-login-list"
                    data-toggle="list"
                    role="tab"
                    aria-controls="login"
                  >
                    <i className={`fas fa-sign-in-alt ${navbar.icon}`} />
                    Login
                  </Link>
                </li>
                <li className="nav-item active">
                  <Link
                    to='/signup'
                    className="nav-link"
                    id="list-signup-list"
                    data-toggle="list"
                    role="tab"
                    aria-controls="signup"
                  >
                    <i className={`fas fa-user-plus ${navbar.icon}`} />
                    Signup
                  </Link>
                </li>
              </>
            )}
              {loggedIn && (
              <li className="nav-item d-flex justify-content-center align-items-center">
                <a className="nav-link dropdown-toggle active" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <i className={`fas fa-id-card ${navbar.icon}`} />
                  {customer.customer.username}
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <Link
                    to={{
                      pathname: `/customer/${customer.customer.username}`,
                      state: { id: customer.customer._id }
                    }}
                    className="dropdown-item"
                    id="list-profile-list"
                    data-toggle="list"
                    role="tab"
                    aria-controls="profile"
                  >
                    Profile
                  </Link>
                  {customer.role === 'Role_Admin' && (
                    <Link
                      to='/adminPanel'
                      className="dropdown-item"
                      id="list-profile-list"
                      data-toggle="list"
                      role="tab"
                      aria-controls="profile"
                    >
                      Admin Panel
                    </Link>
                  )}
                  <div className="dropdown-divider" />
                  <Link
                    to='/'
                    className="dropdown-item"
                    id="list-logout-list"
                    data-toggle="list"
                    role="tab"
                    aria-controls="logout"
                    onClick={this.handleLogoutClick}
                  >
                    Logout
                  </Link>
                </div>
              </li>
            )}
            </ul>
          </div>
        </nav>
      </header>
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
  getCart: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
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

const mapDispatchToProps = dispatch => bindActionCreators({
  getCart: getCookieData,
  logout: customerLogout
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NavBar));