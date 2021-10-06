/* eslint-disable react/sort-comp */
/* eslint-disable no-plusplus */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component} from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, withRouter } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-validation/build/select";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import { COUNTRIES} from '../constants/constants';
import {deleteCookieData} from '../actions/cookies';
import guestConfirmOrder from '../helpers/guestConfirmOrder';
import style from '../style/CheckoutFormGuest.module.css';

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

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

const dropMenuCountries = COUNTRIES.map(
  country => <option key={country} value={country}>{country}</option>,
);

class CheckoutFormGuest extends Component  {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  };

  getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (`${name  }=`)) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
  }

  async handleSubmit (e) {
    e.preventDefault();
    this.setState({
      loading: true,
    });
    this.form.validateAll();
    const {confirmOrder, deleteCookie} = this.props;
    const {customer} = this.props.auth;
    const {cookie} = this.props.cookies;
    const token = this.getCookie('csrftoken');
    if (this.checkBtn.context._errors.length === 0) {
      const newCust = await confirmOrder(this.state, token, cookie);
      await deleteCookie('cart');
      this.props.history.push(
        {
          pathname: `/customer/${newCust.customer.username}`,
          state: { id: newCust.customer._id }
        }
      )
      this.setState({
        loading: false,
      });    
    } else {
      this.setState({
        loading: false,
      });
    }
  };

  render(){
    return (
      <div className={`card ${style.card2}`}>
        <Form 
          className="card-body"
          onSubmit={this.handleSubmit}
          ref={(c) => {
              this.form = c;
            }}
        >
          <div className="row">
            <div className="col-md-6 mb-2">
              <div className={style.mdform}>
                <Input type="text" name="firstname" id="firstName" className="form-control" onChange={this.handleChange} validations={[required]} />
                <label htmlFor="firstName" className="">First name</label>
              </div>
            </div>
            <div className="col-md-6 mb-2">
              <div className={style.mdform}>
                <Input type="text" name="lastname" id="lastName" className="form-control" onChange={this.handleChange} validations={[required]} />
                <label htmlFor="lastName" className="">Last name</label>
              </div>
            </div>
          </div>
          <div className={`${style.mdform} input-group pl-0 mb-5`}>
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">@</span>
            </div>
            <input type="text" name='email' className="form-control py-0" placeholder="Email" aria-describedby="basic-addon1" onChange={this.handleChange} validations={[required, email]} />
          </div>
          <div className={`${style.mdform} mb-5`}>            
            <Input type="text" id="username" name="username" className="form-control" placeholder="Add Username" onChange={this.handleChange} validations={[required]} />
            <label htmlFor="username" className={style.label}>Username</label>
          </div>
          <div className={`${style.mdform} mb-5`}>
            <Input type="password" id="password" name="password" className="form-control" placeholder="Add your password" onChange={this.handleChange} validations={[required, vpassword]} />
            <label htmlFor="address" className="">Password</label>
          </div>
          <div className={`${style.mdform} mb-5`}>
            <Input type="text" id="phone" name="phone" className="form-control" placeholder="Add your phone number" onChange={this.handleChange} validations={[required]} />
            <label htmlFor="address" className="">Phone</label>
          </div>
          <div className={`${style.mdform} mb-5`}>
            <Input type="text" id="address" name="address" className="form-control" placeholder="Apartment or suite" onChange={this.handleChange} validations={[required]} />
            <label htmlFor="address" className="">Address</label>
          </div>
          <div className={`${style.mdform} mb-5`}>
            <Input type="text" id="city" name="city" className="form-control" placeholder="Add city" onChange={this.handleChange} validations={[required]} />
            <label htmlFor="city" className="">City</label>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-12 mb-4">
              <label htmlFor="country">Country</label>
              <Select className="custom-select d-block w-100" name="country" id="country" onChange={this.handleChange} validations={[required]}>
                <option value="">Choose...</option>
                {dropMenuCountries}
              </Select>
            </div>
            <div className="col-lg-4 col-md-6 mb-4">
              <label htmlFor="state">State</label>
              <Input type='text' className="form-control" id="state" name="state" onChange={this.handleChange} validations={[required]} />
            </div>
            <div className="col-lg-4 col-md-6 mb-4">
              <label htmlFor="zip">Zip Code</label>
              <Input type="text" name="zipcode" className="form-control" id="zip" placeholder="" validations={[required]} onChange={this.handleChange} />
            </div>
          </div>
          <hr />
          <div className="custom-control custom-checkbox">
            <input type="checkbox" className="custom-control-input" id="same-address" checked />
            <label className="custom-control-label" htmlFor="same-address">Shipping address is the same as my billing address</label>
          </div>
          <div className="custom-control custom-checkbox">
            <input type="checkbox" className="custom-control-input" id="save-info" checked />
            <label className="custom-control-label" htmlFor="save-info">Save this information for next time</label>
          </div>
          <hr className="mb-4" />
          <div className="form-group">
            <button
              className="btn btn-info btn-lg btn-block"
              disabled={this.state.loading}
              type="submit"
            >
              {this.state.loading && (
              <span className="spinner-border spinner-border-sm" />
                )}
              <span>Confirm personal data and shipping</span>
            </button>
          </div>
          <CheckButton
            style={{ display: "none" }}
            ref={(c) => {
                this.checkBtn = c;
              }}
          />
        </Form>
      </div>
    );
  };
}

CheckoutFormGuest.propTypes = {
  auth: PropTypes.shape({
    loggedIn: PropTypes.bool,
    customer: PropTypes.object,
  }).isRequired,
  cookies: PropTypes.shape({
    cookie: PropTypes.object,
  }).isRequired,
  confirmOrder: PropTypes.func.isRequired,
  deleteCookie: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: {
    loggedIn: state.auth.loggedIn,
    customer: state.auth.customer,
  },
  cookies: {
    cookie: state.cookies.cookie,
  },
});

const mapDispatchToProps = dispatch => bindActionCreators({
  confirmOrder: guestConfirmOrder,
  deleteCookie: deleteCookieData
}, dispatch);



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CheckoutFormGuest));