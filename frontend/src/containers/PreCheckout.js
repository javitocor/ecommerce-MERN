/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Link, Redirect, withRouter } from 'react-router-dom';
import style from '../style/PreCheckout.module.css';


const PreCheckout = props => {
  const {loggedIn} = props;

  if (loggedIn) {
    return <Redirect to="/checkout" />;
  }
  
  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div className="col-md-9 col-sm-8 mt-5 d-flex flex-column align-items-center justify-content-end w-100">
        <div className="row">
          <h3>
            Become a member!
          </h3>
        </div>
        <div className="row">
          <Link
            to='/login'
            className="btn btn-primary"
            id="list-home-list"
            data-toggle="list"
            role="tab"
            aria-controls="home"
          >
            <i className="fas fa-sign-in-alt" />
            Login
          </Link>
        </div>
        <div className="row">
          <Link
            to='/signup'
            className="btn btn-primary"
            id="list-home-list"
            data-toggle="list"
            role="tab"
            aria-controls="home"
          >
            <i className="fas fa-user-plus" />
            Signup
          </Link>
        </div>
        <div className="row">
          <Link
            to='/checkout'
            className="btn btn-primary pull-right"
            id="list-home-list"
            data-toggle="list"
            role="tab"
            aria-controls="home"
          >
            Continua as Guest
            <i className="fas fa-chevron-right" />
          </Link>
        </div>
      </div>
    </div>
  );
};

PreCheckout.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  const { loggedIn } = state.auth;
  return {
    loggedIn,
  };
}

export default withRouter(connect(mapStateToProps, null)(PreCheckout));