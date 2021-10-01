import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/auth";
import navbar from '../style/Navbar.module.css'

class NavBar extends Component {
  handleLogoutClick = () => {
    this.props.logout();
    this.props.history.push("/home");
  };

  render(){
    const { loggedIn, customer } = this.props.auth;
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
                <i className="fa fa-home" />
                Home
              </a>
            </li>
            <li className="nav-item active">
              <a className="nav-link" href="#">
                <i className="fa fa-home" />
                Categories
              </a>
            </li>
          </ul>
          <ul className="navbar-nav ">
            <li className="nav-item">
              <a className="nav-link" href="#">
                <i className="fa fa-bell">
                  <span className="badge badge-info">11</span>
                </i>
                Test
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <i className="fa fa-globe">
                  <span className="badge badge-warning">11</span>
                </i>
                Test
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <i className="fa fa-bell">
                  <span className="badge badge-info">11</span>
                </i>
                Login
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <i className="fa fa-bell">
                  <span className="badge badge-info">11</span>
                </i>
                Signup
              </a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="fa fa-envelope-o">
                  <span className="badge badge-primary">11</span>
                </i>
                Dropdown
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="#">Action</a>
                <a className="dropdown-item" href="#">Another action</a>
                <div className="dropdown-divider" />
                <a className="dropdown-item" href="#">Something else here</a>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
  
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps, { logout })(withRouter(NavBar));